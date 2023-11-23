import { useState, useRef, useEffect } from 'react';

const Table = (p) => {
    const [people, setPeople] = useState([]);
    const [cant, setCant] = useState(0);
    const [probabilidad, setProbabilidad] = useState('');

    const Probabilidad = () => {

        const inputRef = useRef(null);

        const handleInputChange = (e) => {
            let input = e.target.value;
    
            // Reemplazar comas por puntos para asegurar el formato decimal
            input = input.replace(',', '.');
    
            // Permitir una cadena vacía o un punto sin dígitos a la izquierda
            const newValue = input === '' || /^\.$/.test(input) ? '' : input;
    
            // Limitar el valor al rango de 0 a 1
            if (newValue === '' || (parseFloat(newValue) >= 0 && parseFloat(newValue) <= 1)) {
                setProbabilidad(newValue);
            }
        };
    
        useEffect(() => {
            // Enfocar automáticamente el input después de cada cambio
            inputRef.current.focus();
        }, [probabilidad]);
    
        return (
            <div>
                <label htmlFor="num" className="block text-sm font-medium leading-6 text-gray-900">
                    Probabilidad
                </label>
                <div className="relative mt-2">
                    <input
                        type="text" // Cambiar el tipo de entrada a texto
                        name="num"
                        id="num"
                        className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Escriba una probabilidad"
                        value={probabilidad}
                        onChange={handleInputChange}
                        ref={inputRef} // Asignar la referencia al input
                    />
                    <div
                        className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
                        aria-hidden="true"
                    />
                </div>
            </div>
        );
    };
    


    const addPlayer = () => {
        setCant((prevCant) => prevCant + 1);

        // Calcula el valor de ronda2 para el nuevo jugador
        const newRonda1 = (probabilidad * Math.pow(1 - probabilidad, cant)).toFixed(12);
        const newRonda2 = (probabilidad * Math.pow(1 - probabilidad, cant * 2 + 1)).toFixed(12);
        const newRonda3 = (probabilidad * Math.pow(1 - probabilidad, cant * 3 + 2)).toFixed(12);
        let probTotal = 1;

        if (cant > 0) {
            probTotal = probabilidad * Math.pow(1 - probabilidad, cant) / (1 - Math.pow(1 - probabilidad, cant + 1)).toFixed(12);
        }



        // Actualiza el estado con el nuevo jugador y actualiza ronda2 para los jugadores anteriores
        setPeople((prevPeople) => [
            ...prevPeople.map((person, index) => {
                return {
                    ...person,
                    ronda1: (probabilidad * Math.pow(1 - probabilidad, index)).toFixed(12),
                    ronda2: (probabilidad * Math.pow(1 - probabilidad, cant + index + 1)).toFixed(12),
                    ronda3: (probabilidad * Math.pow(1 - probabilidad, cant * 2 + index + 2)).toFixed(12),
                    probabilidadTotal: probabilidad * Math.pow(1 - probabilidad, index) / (1 - Math.pow(1 - probabilidad, cant + 1)).toFixed(12),
                };
            }),
            {
                numero: cant,
                name: `Jugador N.º ${cant+1}`,
                ronda1: newRonda1,
                ronda2: newRonda2,
                ronda3: newRonda3,
                probabilidadTotal: probTotal,
            },
        ]);
    };

    return (
        <div className="bg-gray-900">
            <div className="mx-auto max-w-7xl">
                <div className="bg-gray-900 py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-white">Jugadores</h1>
                                <Probabilidad />
                                <p className="mt-2 text-sm text-gray-300">
                                    Es una lista de jugadores que incluye su probabilidad de ganar en cada ronda y su probabilidad total de ganar el juego.
                                </p>
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                <button
                                    type="button"
                                    className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    onClick={addPlayer}
                                >
                                    Añadir Jugador
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Ronda 1
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Ronda 2
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Ronda 3
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    ...
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                    Probabilidad Total
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800">
                                            {people.map((person) => (
                                                <tr key={person.numero}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                                        {person.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.ronda1}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.ronda2}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.ronda3}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">...</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{person.probabilidadTotal}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
