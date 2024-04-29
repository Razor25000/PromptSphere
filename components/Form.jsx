import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='flex-col w-full max-w-full flex-start'>
      <h1 className='text-left head_text'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='max-w-md text-left desc'>
        Editez et partagez avec le monde entier des prompts incroyables, et laissez libre cours à votre imagination avec toutes les plateformes alimentées par l'IA.(ChatGPT, MistralAI, Midjourney, Perplexity...)
      </p>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col w-full max-w-2xl mt-10 gap-7 glassmorphism'
      >
        <label>
          <span className='text-base font-semibold text-gray-700 font-satoshi'>
            Votre Prompt IA
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder='Ecrit ton prompt ici...'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='text-base font-semibold text-gray-700 font-satoshi'>
            Tag du Prompt{" "}
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='gap-4 mx-3 mb-5 flex-end'>
          <Link href='/' className='text-sm text-gray-500'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
