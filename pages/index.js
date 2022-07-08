import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Card from '../components/Card'


export async function getStaticProps() {
  //buscar dados na API
  const maxPokemons = 251
  const api = 'https://pokeapi.co/api/v2/pokemon/'

  //criar um await com o limit máximos de dados a srem buscados
  const res = await fetch(`${api}/?limit=${maxPokemons}`)
  //transformar dados em json()
  const data = await res.json()

  // add pokemon index
  data.results.forEach((item, index) => {
    item.id = index + 1
  })
  return {
    props: {
      pokemons: data.results,
    }
  }

}

export default function Home({pokemons}) {
  return (
      <>
      <div className={styles.title_container} >
       <h1 className={styles.title}>Poke<span>Next</span></h1>
       <Image 
       src='/images/pokeball.png' 
       width="50" 
       height="50" 
       alt="PokeNext"
       />
      </div>
       <div className={styles.pokemon_container}>
        {pokemons.map((pokemon)=>(
        <Card key={pokemon.id} pokemon={pokemon}/>
        ))}

       </div>
      
     </>
  )
}
