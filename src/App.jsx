import React, {useState} from 'react';


let index_lista = 0;

function App() {

  let [tarea, setTarea] = useState('')
  let [lista, setLista] = useState([]);
  const [editar, setEditar] = useState(false);
  const [id, setId] = useState(0);
  const [error, setError] = useState(null);

  const agregarTarea = (e) =>{
    e.preventDefault();
    
    if(!tarea.trim()){
      setError('Campo vacio')
      return;
    }

    setLista([
      ...lista,
      {id: ++index_lista, nombre_tarea: tarea}
    ])
    
    console.log(tarea);
    setTarea('');
    setError(null);
  }

  const eliminar_tarea = (id) => {
     setLista(lista.filter(item => item.id !== id));
  }

  const editar_capo = (item) => {
    setTarea(item.nombre_tarea);
    setId(item.id);
    setEditar(true);
  }
  
  const editar_tarea = (e) => {
    e.preventDefault();
    
    if(!tarea.trim()){
      setError('Campo vacio')
      return;
    }

    setLista(lista.map(item => item.id === id ? {id, nombre_tarea: tarea} : item));
    setEditar(false);
    setId(0);
    setTarea('')
    setError(null)
  }

  return (
    <div className="container mt-5">
     <h1 className="center">CRUD Simple</h1>
     <hr/>
    <div className="row">
      <div className="col-8">
       <h4 className="text-center"> Listas de tareas </h4>
       <ul className="list-group">
         {
           lista.length === 0 ? (
             <li className="list-group-item">No hay tareas</li>
           ) : (
              lista.map(x => (
            <li className="list-group-item" key={x.id}>
                <span className="lead">
                {x.nombre_tarea}
                </span>
                <button 
                className="btn btn-danger btn-sm float-end mx-2" 
                onClick={() => eliminar_tarea(x.id) }
                >Eliminar
                </button>
                <button 
                className="btn btn-warning btn-sm float-end"
                onClick={() => editar_capo(x)}
                >Editar
                </button>
            </li>
              ))
           )
        }
       </ul>
      </div>
      <div className="col-4">
        <h4 className="text-center">
          {
            editar ? 'Editar tarea': 'Agregar tarea'
          }
        </h4>
        <form onSubmit={editar ? editar_tarea : agregarTarea}>

          {
            error ? <span className="text-danger">{error}</span> : null
          }

          <input 
          type="text" 
          className="form-control mb-2"
          placeholder="Ingrese la tarea"
          onChange={(e) => setTarea(e.target.value)}
          value={tarea}
          />
          <div className="d-grid gap-2">
            {
              editar ? (
                <button className="btn btn-warning" type="submit">Editar</button>
              ) : (
                <button className="btn btn-dark" type="submit">Agregar</button>
              )
            }
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default App;
