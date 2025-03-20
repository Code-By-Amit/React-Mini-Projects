import './Pokemon.css'
import { useState, useEffect } from 'react'
import { PokemonCards } from './PokemonCards';


export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [lodaing, setLoading] = useState(true);
    const [error,setError] = useState(null)
    const [search , setSearch] = useState('')
    // const API = 'https://pokeapi.co/api/v2/pokemon/pikachu'
    const API = 'https://pokeapi.co/api/v2/pokemon?limit=124'
    
    

    // Using Promises
    // function fetchPokemon() {
    //     fetch(API)
    //     .then((res) => res.json() )
    //     .then((data) =>{
    //         console.log(data);
    //         setPokemon(data)
    //         setLoading(false)
    //     })
    //     .catch((error) => {
    //     setError(error)
    //     console.log(error)
    //     setLoading(false)
    //     });
    // }

    // using async-await
    async function fetchPokemon (){
        try{
        let res = await fetch(API);
        let data = await res.json();

        // setPokemon(data)
        // setLoading(false)

        const  detailedPokemonData = data.results.map(async (currPokemon)=>{
            const res = await fetch(currPokemon.url)
            const data = await res.json();
            // console.log('detailed Pokemon: ',data)
            return data;
        })

        const detailedResponses = await Promise.all(detailedPokemonData);
        console.log('detailedResponse: ',detailedResponses)
        setPokemon(detailedResponses)
        setLoading(false)
        }
        catch(error){
            setError(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPokemon();
    }, [])


    const searchData = pokemon.filter((currPokemon)=> currPokemon.name.toLowerCase().includes(search.toLowerCase()))

    
    if(lodaing) {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    } 

    if(error) {
        return(
            <div>
                <h1>Error: {error.message}</h1>
            </div>
        )
    } 

    // if(pokemon){
    return (
        <>
        <section className="container">
            <header>
                <h1>Lets Catch Pokemon</h1>
                <p>Made By Amit.</p>
            </header>
            <div className='pokemon-search'>
                <input type="text" placeholder='Search Pokemon' value={search} onChange={(e)=>setSearch(e.target.value)} />
            </div>
            <ul className='cards'>

               { searchData.map((currentPokemon) => {
                    return <PokemonCards key={currentPokemon.id} pokemonData={currentPokemon} />
                })}
            </ul>
        </section>
        </>

    )
// }
};
