const systemPrompt = "Turn this sql schema diagram into sql schema code. Individual table will be represented by a box. Tables that are related will be connected to each other with a line connecting both of them together. The type of relation - one to one, many to one, or many to many - will be written on top of the line connecting two tables. Inside each box, first row is table name and rest of the rows will be column details."

// const systemPrompt = `You are an expert tailwind developer. A user will provide you with a
//  low-fidelity wireframe of an application and you will return 
//  a single html file that uses tailwind to create the website. Use creative license to make the application more fleshed out.
// if you need to insert an image, use placehold.co to create a placeholder image. Respond only with the html file.`;

export async function POST(request: Request) {
  const { image } = await request.json();
  const body: GPT4VCompletionRequest = {
    model: "gpt-4-vision-preview",
    max_tokens: 4096,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: image, detail: "high" },
          },
          systemPrompt,
        ],
      },
    ],
  };

  let json = null;
  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(body),
    });
    json = await resp.json();
  } catch (e) {
    console.log(e);
  }

  console.log(json)
  const message = json.choices[0].message.content;
  console.log(message)

  return new Response(JSON.stringify(json), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}

type MessageContent =
  | string
  | (
      | string
      | {
          type: "image_url";
          image_url: string | { url: string; detail: "low" | "high" | "auto" };
        }
    )[];

export type GPT4VCompletionRequest = {
  model: "gpt-4-vision-preview";
  messages: {
    role: "system" | "user" | "assistant" | "function";
    content: MessageContent;
    name?: string | undefined;
  }[];
  functions?: any[] | undefined;
  function_call?: any | undefined;
  stream?: boolean | undefined;
  temperature?: number | undefined;
  top_p?: number | undefined;
  max_tokens?: number | undefined;
  n?: number | undefined;
  best_of?: number | undefined;
  frequency_penalty?: number | undefined;
  presence_penalty?: number | undefined;
  logit_bias?:
    | {
        [x: string]: number;
      }
    | undefined;
  stop?: (string[] | string) | undefined;
};
