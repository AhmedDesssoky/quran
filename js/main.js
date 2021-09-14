let audio = document.querySelector('.quranPlayer'),
    sourthContainer = document.querySelector('.sourths'),
    ayah = document.querySelector('.ayah'),
    next = document.querySelector('.next'),
    prev = document.querySelector('.prev')
play = document.querySelector('.play');
console.log(play)
getSourth();
function getSourth() {
    fetch('https://api.quran.sutanlab.id/surah')
        .then(response => response.json())
        .then(data => {
            for (let surah in data.data) {
                sourthContainer.innerHTML += `
                
                <div> 
                <p> ${data.data[surah].name.long}</p>
                <p> ${data.data[surah].name.transliteration.en}</p>

                </div>
                
                `
            }


            let allsurath = document.querySelectorAll('.sourths div'),
                AyaAudios,
                AyaText;
            allsurath.forEach((surah, index) => {
                surah.addEventListener('click', () => {
                    fetch(`https://api.quran.sutanlab.id/surah/${index + 1}`)
                        .then(response => response.json())
                        .then(data => {
                            let verses = data.data.verses;
                            AyaAudios = [];
                            AyaText = [];
                            verses.forEach(verse => {

                                AyaAudios.push(verse.audio.primary)
                                AyaText.push(verse.text.arab)

                            })
                            let AyahIndex = 0;
                            changeAyah(AyahIndex);

                            audio.addEventListener('ended', () => {
                                AyahIndex++;
                                if (AyahIndex < AyaAudios.length) {
                                    changeAyah(AyahIndex)
                                }
                                else {

                                    AyahIndex = 0;
                                    changeAyah(AyahIndex);
                                    audio.pause()
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Surah has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    isplaying = true;
                                    playeTogelle();

                                }
                            })
                            next.addEventListener('click', () => {
                                AyahIndex < AyaAudios.length - 1 ? AyahIndex++ : AyahIndex = 0;
                                changeAyah(AyahIndex)

                            })
                            prev.addEventListener('click', () => {
                                AyahIndex == 0 ? AyahIndex = AyaAudios.length - 1 : AyahIndex--;

                                changeAyah(AyahIndex)

                            })

                            let isplaying = false;
                            playeTogelle();
                            function playeTogelle() {
                                if (isplaying) {
                                    audio.pause();
                                    play.innerHTML = `
                                    <i class="fas fa-play"></i>
                                    `
                                    isplaying = false;
                                }
                                else {
                                    audio.play()
                                    play.innerHTML = `
                                    <i class="fas fa-pause"></i>
                                    `
                                    isplaying = true;
                                }
                            }
                            play.addEventListener('click', playeTogelle)
                            function changeAyah(index) {
                                audio.src = AyaAudios[index];
                                ayah.innerHTML = AyaText[index]

                            }



                        })
                })
            })

        })
}