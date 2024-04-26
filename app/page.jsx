import Feed from "./components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Découvrez & Partagez
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Une aide alimentée par l'IA</span>
    </h1>
    <p className='desc text-center'>
      PromptSphere est un outil open-source d'IA pour le monde moderne qui permet de découvrir, de créer et de partager des prompts créatifs.
    </p>

    <Feed />
  </section>
);

export default Home;