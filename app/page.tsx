"use client";

import { useState } from "react";
import Textarea from "./components/textarea";

export default function Main() {
  const [value, setValue] = useState("");

  return (
    <div>
      <Textarea value={value} onChange={setValue} maxLength={80} placeholder="텍스트를 입력해주세요" errorMessage="최소 8자 이상 입력해주세요" />
    </div>
  );
}
