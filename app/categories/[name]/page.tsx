export default async function Page({ params }: { params: { name: string } }) {
  return <h1>{params.name}</h1>;
}
