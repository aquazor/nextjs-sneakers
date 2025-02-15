export default function ItemDescription() {
  return (
    <div className="flex flex-col gap-6">
      <dl className="text-lg">
        <div className="flex gap-1">
          <dt className="font-bold">Lorem:</dt>
          <dd>Lorem ipsum dolor sit amet.</dd>
        </div>
        <div className="flex gap-1">
          <dt className="font-bold">Ipsum:</dt>
          <dd>Lorem ipsum dolor sit, amet consectetur.</dd>
        </div>
        <div className="flex gap-1">
          <dt className="font-bold">Dolor:</dt>
          <dd>Lorem ipsum dolor sit.</dd>
        </div>
      </dl>

      <div>
        <h3 className="text-xl mb-1 underline underline-offset-2">Description:</h3>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa cum hic, alias
          unde est eaque veniam magni reprehenderit, incidunt voluptatibus laudantium
          accusamus, esse autem dolorum quod! Asperiores aut nam consequatur veritatis
          dolorem quibusdam, placeat vitae perspiciatis blanditiis beatae sint neque.
        </p>
      </div>
    </div>
  );
}
