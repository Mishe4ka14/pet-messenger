const avatarOptions = [
  'https://avatars.mds.yandex.net/i?id=e61c5942cac4921149f06607794b7f01d1151a0f3141d6e1-4885151-images-thumbs&n=13',
  'https://avatars.mds.yandex.net/i?id=32da4f53130f4b6ff09934d3ee3231fbef6aff22-10636835-images-thumbs&n=13',
  'https://avatars.mds.yandex.net/i?id=e9d6c4d110fdd52b11404c1f2f81213c14389cb55529b6e4-12164831-images-thumbs&n=13',
  'https://avatars.mds.yandex.net/i?id=a5f61692d0eb0026114e617cd3597d11de41bc8ea26da4d1-3674804-images-thumbs&n=13',
  'https://avatars.mds.yandex.net/i?id=35454a30d3de2487b56d64d933acf18d1eeaa325-12423388-images-thumbs&n=13',
  'https://avatars.mds.yandex.net/i?id=1b42e997bd6d7e55a3bc880050bed04203eb68bf-5285824-images-thumbs&n=13',
];

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatarOptions.length);
  return avatarOptions[randomIndex];
};

export default getRandomAvatar;
