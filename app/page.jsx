import Feed from "./components/Feed";

const Home = () => (
  <section className='flex-col w-full flex-center'>
    <h1 className='text-center head_text'>
      Découvrez & Partagez
      <br className='max-md:hidden' />
      <span className='text-center orange_gradient'> Une aide alimentée par l'IA</span>
    </h1>
    <p className='text-center desc'>
      PromptSphere est un outil open-source d'IA pour le monde moderne qui permet de découvrir, de créer et de partager des prompts créatifs.
    </p>

    <Feed />
  </section>
);

export default Home;