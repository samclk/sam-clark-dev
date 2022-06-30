import Link from 'next/link'
import { socials } from '../../data/socials'

const Socials: React.FC = () => {
  return (
    <div className="ml-5 flex gap-3">
      {socials.map((social, idx) => {
        return (
          <Link key={idx} href={social.url} passHref>
            <a target="_blank" className="hover:text-pink-500">
              {social.icon}
            </a>
          </Link>
        )
      })}
    </div>
  )
}

export default Socials
