/// <reference types="@popclip/types" />
// #popclip
// name: Say
// icon: say.svg
// description: Read it
// shortcut: option+r
// keywords: text to speech, tts, ai
// entitlements: [network]

import axios from "axios";

export const options = [
  {
    identifier: "timbre",
    label: "Timbre",
    type: "multiple",
    defaultValue: "male",
    values: ["male", "female"],
  },
] as const;

type Options = InferOptions<typeof options>;

const say: ActionFunction<Options> = async input => {
  try {
    const response = await axios({
      method: "POST",
      url: "http://localhost:8000/text-to-speech",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        text: input.text.trim(),
      },
    });
    if (response.status === 200) {
      popclip.showSuccess();
    } else {
      popclip.showFailure();
    }
  } catch (error) {
    console.error(error);
    popclip.showFailure();
  }
};

export const action: Action<Options> = {
  title: "Say",
  code: say,
};
