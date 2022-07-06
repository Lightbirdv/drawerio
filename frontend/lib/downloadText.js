import React from "react";

export const downloadText = () => {
  console.log(y);
  const x = () => {
    const element = document.createElement("a");
    const file = new Blob(["hello world"], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div>
      <button onClick={x}>Download txt</button>
    </div>
  );
}