const headers = new Headers({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
    'referer': 'https://www.google.com/'
  });
async function search(keyword, targetDomain) {
      // 프록시 서버 URL 설정
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; 
      // 검색어를 사용하여 구글 검색 URL 생성
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(keyword)}&num=30`; 
   
      try {
          // 프록시 서버를 사용하여 구글 검색 결과 페이지 요청 (헤더 정보 포함)
          const response = await fetch(proxyUrl + searchUrl, { headers});
          // 요청한 페이지의 HTML 텍스트 가져오기
          const html = await response.text(); 
          // HTML문서를 객체모델(DOM)구조로 변환하여 요소를 쉽게 찾을수 있게함)
          const parser = new DOMParser(); 
          // HTML 텍스트를 HTML 문서로 변환
          const htmlDoc = parser.parseFromString(html, 'text/html');
          // 변환된 HTML 문서에서 검색 결과를 선택
          const searchResults = htmlDoc.querySelectorAll(".g"); 
   
          // 검색 결과에 대한 반복문
          searchResults.forEach(result => {
              // 검색 결과의 제목
              const title = result.querySelector("h3")?.innerText; 
              // 검색 결과의 링크를 
              const link = result.querySelector("a")?.href;
              // 링크가 존재하고, 목표 도메인을 포함하면
              if (link && link.includes(targetDomain)) { 
                  // 제목 및 링크 출력
                  console.log(`Title: ${title}, Link: ${link}`); 
              }
          });
      } catch (error) {
          // 에러가 발생한 경우 에러 메시지 출력
          console.error('Error:', error);
      }
  }