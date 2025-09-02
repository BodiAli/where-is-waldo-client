import Loader from "../../components/Loader/Loader";
import useFetch from "../../hooks/useFetch";
import type { IllustrationsType } from "../../types/types";

export default function IllustrationsPage() {
  const { data, loading, error } = useFetch("/illustrations");

  if (loading) {
    return <Loader />;
  }

  if (error) {
    throw new Error(error.message);
  }

  const { illustrations } = data as { illustrations: IllustrationsType };

  return (
    <main>
      <h1>Where's Waldo (Photo Tagging Game)</h1>
      <div>
        {illustrations.map((illustration) => {
          return <div key={illustration.id}>{illustration.difficulty}</div>;
        })}
      </div>
    </main>
  );
}
