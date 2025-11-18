import { newFlag } from "@/lib/flags";

const TestPage = async () => {
  const flagValue = await newFlag();
  console.log(flagValue);
  return (
    <div>
      <h1>Test Page: {flagValue}</h1>
    </div>
  );
};

export default TestPage;
