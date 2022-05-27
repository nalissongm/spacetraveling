import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useRouter } from 'next/router';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  const allWordsInText = post.data.content.reduce((acc, content) => {
    const text = RichText.asText(content.body);
    const arrayTextSplit = text.split(/[ ,;:.?!]+/);

    return acc + arrayTextSplit.length;
  }, 0);

  const readingTime = Math.ceil(allWordsInText / 200);

  if (router.isFallback) {
    return (
      <div className={styles.fallBack}>
        <span>Carregando...</span>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.data.title}</title>
      </Head>
      <Header />
      <main className={styles.Container}>
        <div className={styles.bannerWrapper}>
          <div className={styles.banner_picture}>
            <img src={post.data.banner.url} alt="banner" />
          </div>
        </div>
        <article>
          <div className={`${styles.Content_post} ${commonStyles.Content}`}>
            <h1>{post.data.title}</h1>
            <div className={commonStyles.info}>
              <span>
                <FiCalendar />
                <time>
                  {format(new Date(post.first_publication_date), 'dd LLL yyy', {
                    locale: ptBR,
                  })}
                </time>
              </span>
              <span>
                <FiUser />
                <span>{post.data.author}</span>
              </span>
              <span>
                <FiClock />
                <span>{readingTime} min</span>
              </span>
            </div>
            {post.data.content.map(content => (
              <div className={styles.post_content} key={content.heading}>
                {/* eslint-disable-next-line react/no-danger */}
                <h2
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: RichText.asText(content.heading),
                  }}
                />
                <p
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(content.body),
                  }}
                />
              </div>
            ))}
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {}
  );

  const paths = posts.results.map(post => {
    return {
      params: { slug: post.uid },
    };
  });

  return {
    paths,
    fallback: 'blocking', // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  return {
    props: {
      post: {
        uid: response.uid,
        first_publication_date: response.first_publication_date,
        data: {
          subtitle: response.data.subtitle,
          title: response.data.title,
          banner: {
            url: response.data.banner.url,
          },
          author: response.data.author,
          content: response.data.content,
        },
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};
