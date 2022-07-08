export const getStaticPaths = async() => {
  //buscar dados na API
  const maxPokemons = 251
  const api = 'https://pokeapi.co/api/v2/pokemon/'

  //criar um await com o limit máximos de dados a srem buscados
  const res = await fetch(`${api}/?limit=${maxPokemons}`)
  //transformar dados em json()
  const data = await res.json()

  //params
  const paths = data.results.map((pokemon, index) =>{
    return {
        params: {pokemonId: (index + 1).toString() },
    }
  })

  return {
    paths,
    fallback: false
  }

} 

export const getStaticProps = async(context) => {
    const id = context.params.pokemonId

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await res.json()

    return {
        props: {pokemon: data},
  }

}


export default function Pokemon ({pokemon}) {
    return (
        <>
         <p>{pokemon.name}</p>
        </>
    )
}