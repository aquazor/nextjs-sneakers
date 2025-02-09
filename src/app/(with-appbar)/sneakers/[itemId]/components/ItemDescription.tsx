export default function ItemDescription() {
  return (
    <div className="flex flex-col gap-6">
      <ul className="text-lg">
        <li className="flex gap-1">
          <span className="font-bold">Lorem:</span>
          <p>Lorem ipsum dolor sit amet.</p>
        </li>
        <li className="flex gap-1">
          <span className="font-bold">Ipsum:</span>
          <p>Lorem ipsum dolor sit, amet consectetur.</p>
        </li>
        <li className="flex gap-1">
          <span className="font-bold">Dolor:</span>
          <p>Lorem ipsum dolor sit.</p>
        </li>
      </ul>

      <div>
        <h5 className="text-xl mb-1 underline underline-offset-2">Description:</h5>
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
