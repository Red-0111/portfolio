import './Articles.css';

import { Image } from 'components/Image';
import { Section } from 'components/Section';
import { useScrollRestore } from 'hooks';
import { Post } from 'pages/Post';
import { fetchPosts } from 'posts';
import {
  Fragment,
  Suspense,
  createContext,
  lazy,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Helmet } from 'react-helmet';
import { Route, Link as RouterLink, Routes } from 'react-router-dom';

const Page404 = lazy(() => import('pages/404'));

const ArticlesPost = ({
  slug,
  title,
  description,
  banner,
  bannerPlaceholder,
  bannerAlt,
  date,
}) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <article className="articles__post">
      <RouterLink
        className="articles__post-content"
        to={`/articles/${slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="articles__post-image-wrapper">
          <Image
            play={hovered}
            className="articles__post-image"
            src={banner ? require(`posts/assets/${banner}`).default : undefined}
            placeholder={require(`posts/assets/${bannerPlaceholder}`).default}
            alt={bannerAlt}
          />
          <div className="articles__post-image-tag">K256</div>
        </div>
        <div className="articles__post-text">
          <span className="articles__post-date">
            {new Date(date).toLocaleDateString('default', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
          <h2 className="articles__post-title">{title}</h2>
          <p className="articles__post-description">{description}</p>
        </div>
      </RouterLink>
    </article>
  );
};

const ArticlesLayout = () => {
  const { posts } = useContext(ArticlesContext);
  useScrollRestore();

  return (
    <div className="articles">
      <Helmet>
        <title>{`Articles | Rudransh Arora Frontend`}</title>
        <meta
          name="description"
          content="A collection of technical design and development articles."
        />
      </Helmet>
      <Section className="articles__content">
        <div className="articles__column">
          {posts.map(({ slug, ...post }, index) => (
            <Fragment key={slug}>
              {console.log({ slug })}
              {index !== 0 && <hr className="articles__divider" />}
              <ArticlesPost slug={slug} {...post} />
            </Fragment>
          ))}
        </div>
      </Section>
    </div>
  );
};

const ArticlesContext = createContext({});

export const Articles = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const grabPosts = async () => {
      const postData = await Promise.all(fetchPosts);
      console.log({ postData });
      setPosts(postData);
    };

    grabPosts();
  }, []);

  return (
    <ArticlesContext.Provider value={{ posts }}>
      <Suspense>
        <Routes>
          <Route path="/" element={<ArticlesLayout />} />
          {posts?.map(({ slug, ...rest }) => (
            <Route
              exact
              key={slug}
              path={`/articles/${slug}`}
              render={() => <Post slug={slug} {...rest} />}
            />
          ))}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </ArticlesContext.Provider>
  );
};
