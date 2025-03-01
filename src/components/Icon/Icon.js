import './Icon.css';

import { ReactComponent as ArrowLeft } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from 'assets/icons/arrow-right.svg';
import { ReactComponent as ChevronRight } from 'assets/icons/chevron-right.svg';
import { ReactComponent as Close } from 'assets/icons/close.svg';
import { ReactComponent as Copy } from 'assets/icons/copy.svg';
import { ReactComponent as Dribbble } from 'assets/icons/dribbble.svg';
import { ReactComponent as Error } from 'assets/icons/error.svg';
import { ReactComponent as LinkedIn } from 'assets/icons/linkedin.svg';
import { ReactComponent as Github } from 'assets/icons/github.svg';
import { ReactComponent as Menu } from 'assets/icons/menu.svg';
import { ReactComponent as Pause } from 'assets/icons/pause.svg';
import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Send } from 'assets/icons/send.svg';
import { ReactComponent as Twitter } from 'assets/icons/twitter.svg';
import { classes } from 'utils/style';

export const icons = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  chevronRight: ChevronRight,
  close: Close,
  copy: Copy,
  dribbble: Dribbble,
  error: Error,
  linkedin: LinkedIn,
  github: Github,
  menu: Menu,
  pause: Pause,
  play: Play,
  send: Send,
  twitter: Twitter,
};

export const Icon = ({ icon, style, className, ...rest }) => {
  const IconComponent = icons[icon];

  return <IconComponent aria-hidden className={classes('icon', className)} {...rest} />;
};
