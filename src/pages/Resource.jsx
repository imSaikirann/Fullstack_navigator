import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Resource() {
  const { resource } = useContext(UserContext);
  console.log(resource.information);

  return (
    <div className='home'>
      <Link to = "/frontend">
      <Button colorScheme='purple'>Back</Button>

      </Link>
      {resource && <div>{resource.name}
      {resource.information}
        </div>
      }
    </div>
  );
}
