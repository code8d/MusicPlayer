let songIndex = 0

const songs = ['Skeler - ID1', 'Skeler - ID2', 'Skeler - ID3', 'Skeler - ID4', 'Skeler - ID5', 'Skeler - ID6', 'Skeler - ID7', 'Skeler - ID8', 'Skeler - ID9', 'Skeler - ID10', 'Skeler - ID11', 'Skeler - ID12', 'Skeler - ID13']

const cover = document.querySelector('.cover')
const audio = document.querySelector('.audio')
const songName = document.querySelector('.song__name')
const range = document.querySelector('.controls')
const shuffle = document.querySelector('.shuffle')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const play = document.querySelector('.play')
const repeat = document.querySelector('.repeat')
const list = document.querySelector('.list-block')

play.addEventListener('click', action)
prev.addEventListener('click', prevSong)
next.addEventListener('click', nextSong)

function loadSong(name) {
    cover.src = `./img/songs/${name}.jpg`
    audio.src = `./music/${name}.mp3`
    songName.textContent = name
}

loadSong(songs[songIndex])

function playMusic() {
    audio.classList.add('active')
    play.children[0].src = `./img/pause.png`
    audio.play()
}

function pauseMusic() {
    audio.classList.remove('active')
    play.children[0].src = `./img/action.png`
    audio.pause()
}

function action() {
    let playing = audio.classList.contains('active')

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
}

function nextSong() {
    if (songIndex === songs.length - 1) {
        return songIndex = songs.length - 1
    }   else {
        songIndex++
    }

    loadSong(songs[songIndex])
    playMusic()
}

function musicList() {
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
    
    for (let i = 0; i < songs.length; i++) {
        list.append(createSong(songs[i]))
    }
}
musicList()