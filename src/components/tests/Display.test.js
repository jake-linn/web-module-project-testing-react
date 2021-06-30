//1. Add in nessisary imports and values to establish the testing suite.

import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from './../Display';
import mockFetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow');



//3. Rebuild or copy a show test data element as used in the previous set of tests. 

const testShow = {
    image: null,
    name: 'Manifest',
    seasons: [
        {
            episodes: [],
            id: 1,
            name: 'Season 1'
        },
        {
            episodes: [],
            id: 2,
            name: 'Season 2'
        }
    ],
    summary: 'Do you know what happend to Flight 823?'
}



//2. Test that the Display component renders without any passed in props.

test('renders Display ', () => {
    render(<Display/>)
});


//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.

test('press fetch show component displays', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)
    const button = screen.getByRole("button", /press to get show data/i)
    userEvent.click(button)
    const data = await screen.findByTestId('show-container')
    expect(data).toBeInTheDocument();
    expect(data).toHaveTextContent('Manifest')
})


//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data. 

test("when fetch is pressed, the amount of select options rendered equals the number of seasons", async () => {
    render(<Display />)
    mockFetchShow.mockResolvedValueOnce(testShow)
    const button = screen.getByRole("button", /press to get show data/i)
    userEvent.click(button)
    const seasonOptions = await screen.findAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(2);
})


test("when the fetch button is pressed, the optional functional prop is called", async () => {
    const mockDisplayFunc = jest.fn()
    render(<Display displayFunc={mockDisplayFunc} />)
    mockFetchShow.mockResolvedValueOnce(testShow)
    const button = screen.getByRole("button", /press to get show data/i)
    userEvent.click(button)
    await waitFor(() => expect(mockDisplayFunc).toHaveBeenCalledTimes(1))
});



///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.