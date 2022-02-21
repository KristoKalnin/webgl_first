import App from "../App.svelte";
import { render, screen } from "@testing-library/svelte"
import "@testing-library/jest-dom";

const functions = require("../../src/scene");

const dimensions = [1, 1, 1];
describe('cubeDimensions', () => {
    it("returns void", () => {
        //const { screen } = render(App);
        expect(functions.changeRoofDimensions(dimensions)).toBeUndefined();
    })
})