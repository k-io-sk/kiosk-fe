export const loadKakaoSdk = () =>
  new Promise((resolve, reject) => {
    if (window.Kakao) return resolve(window.Kakao);

    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    script.async = true;

    script.onload = () => {
      const Kakao = window.Kakao;
      if (!Kakao.isInitialized()) {
        Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
      }
      resolve(Kakao);
    };

    script.onerror = () => reject(new Error('Kakao SDK load failed'));
    document.head.appendChild(script);
  });
