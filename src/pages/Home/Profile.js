import './Profile.css';

import { ReactComponent as KatakanaProfile } from 'assets/katakana-profile.svg';
import ProfileImgLarge from 'assets/profile-large.jpg';
import ProfileImgPlaceholder from 'assets/profile-placeholder.jpg';
import ProfileImg from 'assets/profile.jpg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Fragment } from 'react';
import { Transition } from 'react-transition-group';
import { media } from 'utils/style';
import { reflow } from 'utils/transition';

const ProfileText = ({ status, titleId }) => (
  <Fragment>
    <Heading className="profile__title" data-status={status} level={3} id={titleId}>
      <DecoderText text="Hi there!" start={status !== 'exited'} delay={500} />
    </Heading>
    {/* <Text className="profile__description" data-status={status} size="l">
      I’m Rudransh, currently I live in Gurugram working as a senior product designer at{' '}
      <Link href="https://www.qwilr.com">Qwilr</Link>. My projects include UX design, UI
      animations, and icon illustration. Being comfortable with code allows me to rapidly
      prototype and validate experiences. If you're interested in the tools and software I
      use check out my <Link href="/uses">uses page</Link>.
    </Text> */}
    <Text className="profile__description" data-status={status} size="l">
      I’m Rudransh, an all-time learner from Gurugram, currently pursuing my B.Tech from Thapar Institute of Engineering and Technology, Patiala, majoring in Electronics and Computer Engineering {' '}(
      <Link href="https://www.thapar.edu/upload/files/BE%20ENC%202020.pdf">ENC</Link>). I love to explore tech until things start to wreck xD. 
    </Text>
    <Text className="profile__description" data-status={status} size="l">
      I like to spend my spare time with nature, playing guitar and playing video games. I am always ready to take up new projects, so feel free to ping me up.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const titleId = `${id}-title`;

  return (
    <Section
      className="profile"
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible} timeout={0} onEnter={reflow}>
        {status => (
          <div className="profile__content">
            <div className="profile__column">
              <ProfileText status={status} titleId={titleId} />
              <Button
                secondary
                className="profile__button"
                data-status={status}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className="profile__column">
              <div className="profile__tag" aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={status !== 'entered'}
                  collapseDelay={1000}
                />
                <div className="profile__tag-text" data-status={status}>
                  About Me
                </div>
              </div>
              <div className="profile__image-wrapper">
                <Image
                  reveal
                  delay={100}
                  placeholder={ProfileImgPlaceholder}
                  srcSet={`${ProfileImg} 480w, ${ProfileImgLarge} 960w`}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Me standing in front of the Torii on Miyajima, an island off the coast of Hiroshima in Japan"
                />
                <KatakanaProfile className="profile__svg" data-status={status} />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
