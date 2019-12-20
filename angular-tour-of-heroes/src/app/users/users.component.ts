import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  heroes: User[];

  constructor(private heroService: UserService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getUsers()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addUser({ name } as User)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: User): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteUser(hero).subscribe();
  }

}
