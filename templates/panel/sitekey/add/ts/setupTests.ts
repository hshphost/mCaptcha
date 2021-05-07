/*
 * Copyright (C) 2021  Aravinth Manivannan <realaravinth@batsense.net>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import getNumLevels from './levels/getNumLevels';
import {Level} from './levels/index';
import CONST from './const';
import addLevelButtonAddEventListener from './addLevelButton';

/** get rid of all whitespaces, useful when comparing DOM states */
export const trim = (s: string) => s.replace(/\s/g, '');

export const level1: Level = {
  difficulty_factor: 200,
  visitor_threshold: 500,
};

export const level1diffErr: Level = {
  difficulty_factor: 100,
  visitor_threshold: 600,
};

export const level1visErr: Level = {
  difficulty_factor: 600,
  visitor_threshold: 400,
};

export const level2: Level = {
  difficulty_factor: 400,
  visitor_threshold: 700,
};

/** add level to DOM by filling add level form and clicking "Add" button */
export const addLevel = (visitor: number, diff: number) => {
  fillAddLevel(visitor, diff);
  const addLevelButton = <HTMLElement>(
    document.querySelector(`.${CONST.ADD_LEVEL_BUTTON}`)
  );
  addLevelButton.click();
};

/** Fill add level form without clicking add button */
export const fillAddLevel = (
  visitor: number | string,
  diff: number | string,
) => {
  addLevelButtonAddEventListener();

  const level = getNumLevels();
  const visitorField = <HTMLInputElement>(
    document.getElementById(`${CONST.VISITOR_WITHOUT_LEVEL}${level}`)
  );
  visitorField.value = visitor.toString();

  const diffField = <HTMLInputElement>(
    document.getElementById(`${CONST.DIFFICULTY_WITHOUT_LEVEL}${level}`)
  );
  diffField.value = diff.toString();
};

/** Fill add level form without clicking add button */
export const editLevel = (level: number, visitor?: number, diff?: number) => {
  if (visitor !== undefined) {
    const visitorField = <HTMLInputElement>(
      document.getElementById(`${CONST.VISITOR_WITHOUT_LEVEL}${level}`)
    );
    visitorField.value = visitor.toString();
  }

  if (diff !== undefined) {
    const diffField = <HTMLInputElement>(
      document.getElementById(`${CONST.DIFFICULTY_WITHOUT_LEVEL}${level}`)
    );
    diffField.value = diff.toString();
  }
};

/** Fill description in add level form */
export const fillDescription = (description: string) => {
  const inputElement = <HTMLInputElement>document.getElementById('description');
  inputElement.value = description;
};

/** Fill duration in add level form */
export const fillDuration = (duration: number | string) => {
  const inputElement = <HTMLInputElement>document.getElementById('duration');
  inputElement.value = duration.toString();
};

export const getAddForm = () => `
<form class="sitekey-form" action="/api/v1/mcaptcha/levels/add" method="post">
  <h1 class="form__title">
    Add Sitekey
  </h1>
  <label class="sitekey-form__label" for="description">
    Description
    <input
      class="sitekey-form__input"
      type="text"
      name="description"
      id="description"
      required=""
      
    />
  </label>

  <label class="sitekey-form__label" for="duration">
    Cooldown Duratoin(in seconds)
    <input
      class="sitekey-form__input"
      type="number"
      name="duration"
      id="duration"
      min="0"
      required=""
      value="30"
    />
  </label>

  <fieldset class="sitekey__level-container" id="level-group-1">
    <legend class="sitekey__level-title">
      Level 1
    </legend>
    <label class="sitekey-form__level-label" for="visitor1"
      >Visitor
      <input
        class="sitekey-form__level-input"
        type="number"
        name="visitor1"
        
        id="visitor1"
      />
    </label>

    <label class="sitekey-form__level-label" for="difficulty1">
      Difficulty
      <input
        type="number"
        name="difficulty1"
        class="sitekey-form__level-input"
        
        id="difficulty1"
      />
    </label>
    <label class="sitekey-form__level-label--hidden" for="add">
      Add level
      <input
        class="sitekey-form__level-add-level-button"
        type="button"
        name="add"
        id="add"
        value="Add"
      />
    </label>
  </fieldset>

  <button class="sitekey-form__submit" type="submit">Submit</button>
</form>
`;

/** get initial form to test remove button functionality */
export const getRemoveButtonHTMLForm = () => {
  return `
<form class="sitekey-form" action="/api/v1/mcaptcha/levels/add" method="post">
  <h1 class="form__title">
    Add Sitekey
  </h1>
  <label class="sitekey-form__label" for="description">
    Description
    <input
      class="sitekey-form__input"
      type="text"
      name="description"
      id="description"
      required=""
      
    >
  </label>

  <label class="sitekey-form__label" for="duration">
    Cooldown Duratoin(in seconds)
    <input
      class="sitekey-form__input"
      type="number"
      name="duration"
      id="duration"
      min="0"
      required=""
      value="30"
    >
  </label>

  <fieldset class="sitekey__level-container" id="level-group-1">
    <legend class="sitekey__level-title">
      Level 1
    </legend>
    <label class="sitekey-form__level-label" for="visitor1"
      >Visitor
      <input
        class="sitekey-form__level-input"
        type="number"
        name="visitor1"
        
        id="visitor1"
      >
    </label>

    <label class="sitekey-form__level-label" for="difficulty1">
      Difficulty
      <input
        type="number"
        name="difficulty1"
        class="sitekey-form__level-input"
        
        id="difficulty1"
      >
    </label>
    <label class="sitekey-form__level-label--hidden" for="remove-level1">
      Remove Level
      <input
        class="sitekey-form__level-remove-level-button"
        type="button"
        name="remove-level1"
        id="remove-level1"
        value="x"
      >
    </label>
  </fieldset>
  <fieldset class="sitekey__level-container" id="level-group-2">
    <legend class="sitekey__level-title">
      Level 2
    </legend>
    <label class="sitekey-form__level-label" for="visitor2"
      >Visitor
      <input
        class="sitekey-form__level-input"
        type="number"
        name="visitor2"
        
        id="visitor2"
      >
    </label>

    <label class="sitekey-form__level-label" for="difficulty2">
      Difficulty
      <input
        type="number"
        name="difficulty2"
        class="sitekey-form__level-input"
        
        id="difficulty2"
      >
    </label>
    <label class="sitekey-form__level-label--hidden" for="remove-level2">
      Remove Level
      <input
        class="sitekey-form__level-remove-level-button"
        type="button"
        name="remove-level2"
        id="remove-level2"
        value="x"
      >
    </label>
  </fieldset>
  <fieldset class="sitekey__level-container" id="level-group-3">
    <legend class="sitekey__level-title">
      Level 3
    </legend>
    <label class="sitekey-form__level-label" for="visitor3"
      >Visitor
      <input
        class="sitekey-form__level-input"
        type="number"
        name="visitor3"
        
        id="visitor3"
      >
    </label>

    <label class="sitekey-form__level-label" for="difficulty3">
      Difficulty
      <input
        type="number"
        name="difficulty3"
        class="sitekey-form__level-input"
        
        id="difficulty3"
      >
    </label>
    <label class="sitekey-form__level-label--hidden" for="remove-level3">
      Remove Level
      <input
        class="sitekey-form__level-remove-level-button"
        type="button"
        name="remove-level3"
        id="remove-level3"
        value="x"
      >
    </label>
  </fieldset>

  <fieldset class="sitekey__level-container" id="level-group-4">
    <legend class="sitekey__level-title">
      Level 4
    </legend>
    <label class="sitekey-form__level-label" for="visitor4"
      >Visitor
      <input
        class="sitekey-form__level-input"
        type="number"
        name="visitor4"
        
        id="visitor4"
      >
    </label>

    <label class="sitekey-form__level-label" for="difficulty4">
      Difficulty
      <input
        type="number"
        name="difficulty4"
        class="sitekey-form__level-input"
        
        id="difficulty4"
      >
    </label>
    <label class="sitekey-form__level-label--hidden" for="add">
      Add level
      <input
        class="sitekey-form__level-add-level-button"
        type="button"
        name="add"
        id="add"
        value="Add"
      >
    </label>
  </fieldset>

  <button class="sitekey-form__submit" type="submit">Submit</button>
</form>
`;
};
