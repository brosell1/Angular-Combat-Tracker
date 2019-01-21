import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Row } from './Row'

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})

export class InitiativeComponent implements OnInit {
  public id = 0;
  public newPlayer = {name: '', color: ''}
  public iterablePlayers = [];
  private rows = [new Row(0, '', 'GM', 0, false, this.id++)];
  private players = {
    "GM": "#e57373",
  };
  private colors = [
    { name: 'Blue', code: '#64b5f6' },
    { name: 'Teal', code: '#4dd0e1' },
    { name: 'Purple', code: '#9575cd' },
    { name: 'Yellow', code: '#fff176' },
    { name: 'Orange', code: '#ffb74d' },
    { name: 'Green', code: '#aed581' },
    { name: 'Pink', code: '#ffcdd2' },
    { name: 'Grey', code: '#e0e0e0' },
    { name: 'Light blue', code: '#81d4fa' },
    { name: 'Dark green', code: '#4caf50' },
    { name: 'Brown', code: '#a1887f' },
  ]
  constructor() { }

  ngOnInit() {
    this.iterablePlayers = Object.keys(this.players);
  }

  roll(row) {
    if (!row.character || this.rows.filter(item => item.character == row.character).length > 1) {
      alert('Please enter a unique name for your character.');
      return
    }

    const randomNumber = Math.ceil(Math.random() * 20);
    const randomNumberAdvantage = Math.ceil(Math.random() * 20);
    let finalInitiative = -1;
    const modifierString = `${row.modifier >= 0 ? '+' : '-'} ${row.modifier}`
    let advantageString = '';

    if (row.advantage) {
      finalInitiative = randomNumber > randomNumberAdvantage
      ? randomNumber
      : randomNumberAdvantage;
      advantageString = ` / ${randomNumberAdvantage} ${modifierString}`
    } else {
      finalInitiative = randomNumber;
    }

    row.score = finalInitiative + row.modifier;
    console.log(`${row.character} (${row.player}) rolled a ${randomNumber} ${modifierString}${advantageString} for a total of ${row.score}`);
    this.sortRows();
  }

  addRow() {
    this.rows.push(new Row(0, '', 'GM', 0, false, this.id++));
  }

  delete(row) {
    this.rows = this.rows.filter(item => item.id != row.id);
  }

  sortRows() {
    this.rows.sort((a, b) => {
      if (b.score == a.score) {
        return b.modifier - a.modifier;
      }
      return b.score - a.score
    });
  }

  createNewPlayer() {
    if (!this.newPlayer.name || !this.newPlayer.color) {
      return alert('Please choose a name and valid colour for your player.');
    }

    this.players[this.newPlayer.name] = this.newPlayer.color;
    console.log(this.newPlayer)
    this.colors = this.colors.filter(item => item.code != this.newPlayer.color);
    this.newPlayer.name = '';
    this.newPlayer.color = '';
    this.iterablePlayers = Object.keys(this.players);
  }
}
