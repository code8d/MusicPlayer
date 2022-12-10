let songIndex = 0

let songs = ['Skeler - ID1', 'Skeler - ID2', 'Skeler - ID3', 'Skeler - ID4', 'Skeler - ID5', 'Skeler - ID6', 'Skeler - ID7', 'Skeler - ID8', 'Skeler - ID9', 'Skeler - ID10', 'Skeler - ID11', 'Skeler - ID12', 'Skeler - ID13']

const cover = document.querySelector('.cover')
const audio = document.querySelector('.audio')
const songName = document.querySelector('.song__name')
const shuffle = document.querySelector('.shuffle')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const play = document.querySelector('.play')
const repeat = document.querySelector('.repeat')
const list = document.querySelector('.list-block')
const controls = document.querySelector('.controls')
const progressbar = document.querySelector('.progress')
const timeFrom = document.querySelector('.time__from')
const timeTo = document.querySelector('.time__to')

play.addEventListener('click', action)
prev.addEventListener('click', prevSong)
next.addEventListener('click', nextSong)
shuffle.addEventListener('click', shuffleFunc)

timeTo.textContent = `3:09`

function loadSong(name) {
    cover.src = `./img/songs/${name}.jpg`
    audio.src = `./music/${name}.mp3`
    songName.textContent = name
    
    setTimeout(() => {
        timeTo.textContent = updateTime(audio.duration)
    }, 10)
}

loadSong(songs[songIndex])

function playMusic() {
    audio.classList.add('active')
    // play.children[0].src = `./img/pause.png`
    play.children[0].classList.add('fa-pause')
    play.children[0].classList.remove('fa-play')
    audio.play()
}

function pauseMusic() {
    audio.classList.remove('active')
    // play.children[0].src = `./img/action.png`
    play.children[0].classList.add('fa-play')
    play.children[0].classList.remove('fa-pause')
    audio.pause()
}

function action() {
    let playing = audio.classList.contains('active')
    play.children[0].classList.add('fa-pause')

    if (playing) {
        pauseMusic()
    }   else {
        playMusic()
    }
}

function prevSong() {
    if (songIndex <= 0) {
        return songIndex = 0
    }   else {
        songIndex--
    }

    loadSong(songs[songIndex])
    playMusic()
    timeFrom.textContent = `0:00`

    setTimeout(() => {
        timeTo.textContent = updateTime(audio.duration)
    }, 10)
}

function nextSong() {
    if (songIndex === songs.length - 1) {
        return songIndex = songs.length - 1
    }   else {
        songIndex++
    }

    loadSong(songs[songIndex])
    playMusic()
    timeFrom.textContent = `0:00`

    setTimeout(() => {
        timeTo.textContent = updateTime(audio.duration)
    }, 10)
}

function musicList(array) {
    function createSong(url) {
        const item = document.createElement('button')
        item.classList.add('item')
    
        const itemImageBlock = document.createElement('div')
        itemImageBlock.classList.add('item__image-block')
    
        const img = document.createElement('img')
        img.classList.add('image')
        img.src = `./img/songs/${url}.jpg`
    
        const itemName = document.createElement('div')
        itemName.classList.add('item__name')
        itemName.textContent = url
    
        const itemTime = document.createElement('div')
        itemTime.classList.add('item__time')
    
        item.append(itemImageBlock)
        itemImageBlock.append(img)
        item.append(itemName)
        item.append(itemTime)
    
        return item
    }

    for (let i = 0; i < array.length; i++) {
        list.append(createSong(array[i]))
    }
}
musicList(songs)

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progressbar.style.width = `${progressPercent}%`

    timeFrom.textContent = updateTime(audio.currentTime)
}
audio.addEventListener('timeupdate', updateProgress)

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
    timeFrom.textContent = updateTime(audio.currentTime)
}
controls.addEventListener('click', setProgress)

function musicLength() {
    timeTo.textContent = audio.duration
}

function shuffleFunc() {
    let randomNum = randomNumber(0, 12)

    if (randomNum === songIndex) {
        return shuffleFunc()
    }   else {
        songIndex = randomNum
    }
    
    loadSong(songs[songIndex])
    playMusic()
    setTimeout(() => {
        timeTo.textContent = updateTime(audio.duration)
    }, 10)
}

// function randomId() {
//     return Math.random()
// }

// function createPersonArray(songName, songId) {
//     let song = [
//         songName,
//         songId
//     ]
//     return song
// }

// function bubbleSort(array) {
//     for (let i = 0; i < array.length; i++) {
//         for (let j = 0; j < array.length; j++) {
            
//             if (array[j + 1] === undefined) {
//                 continue
//             }
//             if (array[j + 1][1] < array[j][1]) {
//                 [array[j], array[j + 1]] = [array[j + 1], array[j]]
//             }
//         }
//     }
//     return array
// }

function randomNumber(min, max) {
    let rand = Math.floor(min - 0.5 + Math.random() * (max - min + 1))

    if (rand === - 1) {
        return randomNumber(min, max)
    }
    return rand
}

const items = Array.from(list.querySelectorAll('.item'))
items.forEach(item => {
    item.addEventListener('click', () => {
        playThisOne(item)
    })
})

function playThisOne(elem) {
    songIndex = items.indexOf(elem)
    loadSong(elem.children[1].textContent)
    setTimeout(() => {
        timeTo.textContent = updateTime(audio.duration)
    }, 11)
    playMusic()
}

audio.addEventListener('ended', nextSong)

function updateTime(time) {
    let currentTime = Math.floor(time)

    if (currentTime < 10) {
        return `0:0${currentTime}`
    }
    if (currentTime === 10) {
        return `0:10`
    }
    if (currentTime < 60) {
        return `0:${currentTime}`
    }
    if (currentTime === 60) {
        return `1:00`
    }
    if (currentTime > 60 && currentTime < 70) {
        return `1:0${currentTime - 60}`
    }
    if (currentTime === 70) {
        return `1:10`
    }
    if (currentTime > 70 && currentTime < 119) {
        return `1:${currentTime - 60}`
    }
    if (currentTime === 120) {
        return `2:00`
    }
    if (currentTime > 120 && currentTime < 130) {
        return `2:0${currentTime - 120}`
    }
    if (currentTime === 120) {
        return `2:10`
    }
    if (currentTime > 130 && currentTime < 180) {
        return `2:${currentTime - 120}`
    }
    if (currentTime === 180) {
        return `3:00`
    }
    if (currentTime > 180 && currentTime < 190) {
        return `3:0${currentTime - 180}`
    }
    if (currentTime === 180) {
        return `3:10`
    }
    if (currentTime > 190 && currentTime < 240) {
        return `3:${currentTime - 180}`
    }
    if (currentTime > 240 && currentTime < 250) {
        return `4:0${currentTime - 240}`
    }
    if (currentTime === 250) {
        return `4:10`
    }
    if (currentTime > 250 && currentTime < 300) {
        return `4:${currentTime - 240}`
    }
}