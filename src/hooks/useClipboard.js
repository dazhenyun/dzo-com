import React, { useCallback, useRef } from "react";

export default function useClipboard() {
  const ref = useRef(null);

  const copyToClipboard = useCallback(function (text) {
    return new Promise((res, rej) => {
      try {
        let copyText = text;

        if (!copyText) {
          copyText = ref.current?.value;
        }

        if (!copyText) {
          const error = "The copied content cannot be empty";
          rej(error);
          return;
        }

        if (typeof copyText !== "string" && typeof copyText !== "number") {
          const error = "The copied content must be a string or a number";
          rej(error);
          return;
        }

        navigator.clipboard
          .writeText(copyText.toString())
          .then(function () {
            res(copyText);
          })
          .catch(function (err) {
            rej(err);
          });
      } catch (error) {
        rej(error);
      }
    });
  }, []);

  const getClipboard = useCallback(function () {
    return navigator.clipboard.readText();
  }, []);

  return [ref, { copyToClipboard, getClipboard }];
}

/***
 * 
 * const [, { copyToClipboard }] = useClipboard();

  async function copy() {
    await copyToClipboard('copy');
  }

  return <button onClick={copy}>copy</button>;
 * 
 * 
 */
