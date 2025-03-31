import { useState } from 'react';
import { FiLink } from 'react-icons/fi';
import './Home.css';

import Menu from '../components/Menu';
import LinkItem from '../components/LinkItem';

import api from '../services/api';
import { saveLink } from '../services/storeLinks';

const Home = () => {
  const [link, setLink] = useState('');
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);

  // async function handleShortLink() {
  //   try {
  //     const response = await api.post('/shorten', {
  //       long_url: link,
  //     });
  //     setData(response.data);
  //     setShowModal(true);
  //     saveLink('@encurtaLink', response.data);
  //     setLink('');
  //   } catch {
  //     alert('Digite o link correto!');
  //     setLink('');
  //   }
  // }

  async function handleShortLink() {
    try {
      console.log('🔄 Enviando requisição para encurtar link...');
      console.log('🔗 Link enviado:', link);

      const response = await api.post('/shorten', {
        long_url: link,
      });

      console.log('✅ Resposta da API:', response.data);

      setData(response.data);
      setShowModal(true);
      saveLink('@encurtaLink', response.data);
      setLink('');
    } catch (error) {
      console.error('❌ Erro na requisição:', error);

      if (error.response) {
        console.error('📡 Resposta do servidor:', error.response.data);
        alert(`Erro: ${error.response.data.message || 'Algo deu errado'}`);
      } else if (error.request) {
        console.error('📡 Sem resposta do servidor:', error.request);
        alert('Erro: Sem resposta do servidor. Verifique a conexão.');
      } else {
        console.error('🚨 Erro desconhecido:', error.message);
        alert(`Erro desconhecido: ${error.message}`);
      }

      setLink('');
    }
  }

  return (
    <div className="container-home">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
        <h1>ShortLink</h1>
        <p>Cole seu link para encurtar 👇</p>
      </div>
      <div className="area-input">
        <div>
          <FiLink size={24} color="#fff" />
          <input
            type="text"
            placeholder="Cole seu link aqui..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <button onClick={handleShortLink}>Encurtar Link</button>
      </div>

      <Menu />

      {showModal && (
        <LinkItem content={data} closeModal={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Home;
