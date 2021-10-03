import React from "react";

export function Tracks({ tracks }) {
  const list = [];
  for (const track in tracks) {
    console.log(console.log(track));
    list[track] = <li key={track.id}>{track.title}</li>;
  }
  return list;
}
