import Image from 'next/image'
import styles from '../../styles/Pokemon.module.css'

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
        <div className={styles.pokemon_container}>
         <h1 className={styles.pokemon_title}>{pokemon.name}</h1>
         <Image src={`http://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
             width='200' 
             height='200' 
             alt={pokemon.name}
              />
              <div>
                <h3>Numero:</h3>
                <p>#{pokemon.id}</p>
              </div>
              <div>
                <h3>Tipo:</h3>
                <div className={styles.types_container}>
                  {pokemon.types.map((item, index) =>(
                    <spam 
                    key={index} 
                    className={`${styles.type} ${styles['type_' + item.type.name]}`}>{item.type.name}
                    </spam>
                  ))}
                </div>
              </div>
              <div className={styles.data_container}>
                <div className={styles.data_height}>
                  <h4>Altura:</h4>
                  <p>{pokemon.height * 10} Cm</p>
                </div>
                <div className={styles.data_weight} >
                  <h4>Peso:</h4>
                  <p>{pokemon.weight / 10} Kg</p>
                </div>

              </div>
        </div>
    )
}