import { TypeAnimation } from 'react-type-animation';

export function Banner() {
  return (
    <div>
    <TypeAnimation
      sequence={[
        
        'Explore conhecimentos de Backend',
        2000, 
        'Explore conhecimentos de Frontend',
        2000,
        'Explore conhecimentos de UX Design',
        2000
      ]}
      wrapper="span"
      speed={10}
      style={{ fontSize: '2rem', fontFamily: 'Lato', fontWeight: 400, marginTop: 20, marginBottom: 20}}
      repeat={Infinity}
      className='text-primary'
    />
    </div>
  );
}
