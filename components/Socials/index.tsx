import styled from 'styled-components'
import Link from 'next/link'
import { socials } from '../../data/socials'

const Container = styled.div`
  display: flex;
  margin-left: 1.2rem;
  gap: 0.8rem;
`

const SocialLink = styled.a`
  color: var(--dark);
  cursor: pointer;
  transition: color 300ms;

  &:hover {
    color: var(--color-accent);
  }
`

const Socials: React.FC = () => {
  return (
    <Container>
      {socials.map((social, idx) => {
        return (
          <Link key={idx} href={social.url} passHref>
            <SocialLink target="_blank">{social.icon}</SocialLink>
          </Link>
        )
      })}
    </Container>
  )
}

export default Socials
