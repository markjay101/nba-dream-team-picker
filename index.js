import { Players } from "./players.js";

const container = document.querySelector('.container')
const head = document.querySelector('header')

class PickTeam{
    constructor(root){
        this.el = {
            playersEl: root.querySelector('.players'),
            yourTeamEl: root.querySelector('.generated-team'),
            enemyTeamEl: root.querySelector('.enemy-team'),
            addBtn: root.querySelector('.generate'),
            teams: root.querySelector('.teams'),
            resetPick: root.querySelector('#reset-pick-btn'),
            teamWithStats: root.querySelector('.team-with-stats'),
            generateTeamBtn: root.querySelector('#generate-team-btn'),
            generateEnemyBtn: root.querySelector('#generate-enemy-btn'),
            numberPick: root.querySelector('#number-pick'),
            enemyPickBtn: root.querySelector('#enemy-btn'),
            enemyTeamStats: root.querySelector('#enemy-players-stats'),
            yourTeamStats: root.querySelector('#players-stats'),
            table: root.querySelector('#enemy-table'),
            yourTeam: [],
            enemyTeam: [],
            sum: 0,
        }
        this.el.resetPick.style.display = 'none'
        this.el.generateEnemyBtn.style.display = 'none'
        this.el.generateTeamBtn.disabled = true
        this.renderPlayers()

        this.el.generateTeamBtn.addEventListener('click', () => { 
            console.log("Your Team: ", this.el.yourTeam)
            this.el.teams.style.display = 'flex'
            for (this.i = 0; this.i < this.el.yourTeam.length; this.i++){
                this.card = document.createElement('div')
                this.card.classList.add('card')
                this.yourPlayerImg = document.createElement('img')
                this.yourPlayerImg.src = this.el.yourTeam[this.i].img1
                this.card.appendChild(this.yourPlayerImg)
                this.el.yourTeamEl.appendChild(this.card)
            }
            this.el.generateTeamBtn.disabled = true
            this.el.generateEnemyBtn.disabled = true
            this.el.generateTeamBtn.style.display = 'none'
            this.el.generateEnemyBtn.style.display = 'block'
            this.el.enemyPickBtn.style.display = 'block'
            this.el.table.style.display = 'none'
            this.el.yourTeamEl.scrollIntoView();  
            console.log(this.el.yourTeam)
            this.insertPlayersStats(this.el.yourTeamStats, this.el.yourTeam)
        })
        
        this.el.resetPick.addEventListener('click', () => {
            this.el.yourTeam = []
            this.el.enemyTeam = []
            this.el.yourTeamEl.innerHTML = ''   
            this.el.playersEl.innerHTML = ''
            this.el.enemyTeamEl.innerHTML = ''
            this.el.generateEnemyBtn.style.display = 'none'
            this.el.generateTeamBtn.style.display =  'block'
            this.el.generateTeamBtn.disabled =  true
            this.el.teams.style.display = 'none'
            this.el.sum = 0
            this.el.numberPick.innerHTML = 0
            this.renderPlayers()
        })

        this.el.enemyPickBtn.addEventListener('click', () => {
            this.el.sum = 0
            this.el.numberPick.innerHTML = 0
            head.scrollIntoView()   
        })
        this.el.generateEnemyBtn.addEventListener('click', () => {
            console.log("Enemy Team: ", this.el.enemyTeam)
            this.el.enemyPickBtn.style.display = 'none'
            for (this.i = 0; this.i < this.el.enemyTeam.length; this.i++){
                this.card = document.createElement('div')
                this.card.classList.add('card')
                this.yourPlayerImg = document.createElement('img')
                this.yourPlayerImg.src = this.el.enemyTeam[this.i].img1
                this.card.appendChild(this.yourPlayerImg)
                this.el.enemyTeamEl.appendChild(this.card)
            }
            this.el.generateEnemyBtn.disabled = true
            this.el.generateEnemyBtn.style.display = 'none'
            this.el.table.style.display = 'block'
            this.el.yourTeamEl.scrollIntoView();
            this.insertPlayersStats(this.el.enemyTeamStats, this.el.enemyTeam)
        })
    }
    renderPlayers(){
        for (this.i = 0; this.i < Players.length; this.i++){
            this.card = document.createElement('div')
            this.playerImg = document.createElement('img')
            this.button = document.createElement('button')
            this.button.innerHTML = "Pick"
            this.card.classList.add('card')   
            this.playerImg.src = Players[this.i].img1
            this.button.setAttribute('id', 'player'+ [this.i])
            this.card.appendChild(this.button)
            this.card.appendChild(this.playerImg)
            this.el.playersEl.appendChild(this.card)
            this.pickPlayer(document.querySelector(`#player${this.i}`), Players[this.i])  
        }      
    }
    pickPlayer(pick, player){
        pick.addEventListener('click', () => {
            if (this.el.sum != 5){
                this.el.sum += 1
                this.el.numberPick.innerHTML = this.el.sum
                pick.innerHTML = 'Picked'
                pick.disabled = true
                pick.style.display = 'block'
                if (this.el.sum > 0){
                    this.el.resetPick.style.display = 'block'
                }
                if (this.el.sum === 5){
                    this.el.generateTeamBtn.disabled = false
                    this.el.generateEnemyBtn.disabled = false
                }  
                if (this.el.generateEnemyBtn.style.display === 'none'){
                    this.renderYourTeam(player, this.el.yourTeam)
                    console.log("Your Team", player)
                }
                    
                if (this.el.generateTeamBtn.style.display === 'none'){
                    this.renderYourTeam(player, this.el.enemyTeam)
                    console.log("Enemy Team", player)
                }
                    
            }
            else return
        })    
    }
    renderYourTeam(yourPlayers, team){
        team.push(yourPlayers)
    }
    insertPlayersStats(table, team){
        this.table = table.querySelector('tbody')
        this.renderStats = ''
        for (this.player of team){
            this.renderStats += `
                    <tr>
                        <td>${this.player.name}</td>
                        <td>${this.player.ppg}</td>
                        <td>${this.player.rpg}</td>
                        <td>${this.player.apg}</td>
                        <td>${this.player.fg}</td>
                        <td>${this.player.p3p}</td>
                    <tr/>
            `
        }
        this.table.innerHTML = this.renderStats
    }
}

new PickTeam(container)
