# Imports
from fastapi import Request, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.cors import CORSMiddleware

import json

# initialising FastAPI
api = FastAPI()

origins = ["http://localhost:3000", "*"]

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create local runtime-storage
person_list = [
    # {
    #     "isVotable": True,
    #     "firstName": "Karl",
    #     "lastName": "Karlson",
    #     "email": "karl.karlson@company.com"
    # }
]
vote_list = []


# =========[Test-APIcall]=========
@api.get("/")
async def root():
    """
    Function for example API Call

    Returns:
        Hello World Message(JSON)
    """
    return {"message": "Hello World"}


# =========[/persons Endpoints]=========
@api.post("/persons")
async def person_input(request: Request):
    """
    Function stores Person in runtime-storage and returns it.

    Parameters:
        request: Person-Object(JSON)

    Returns:
        person: Person from Input(JSON)
    """
    person = await request.json()
    vote_list.append({"person": person, "Stimmzahl": 0})
    person_list.append(person)
    return person


@api.get("/persons")
async def person_output():
    """
    Function gives back runtime-storage.

    Returns:
        person_list: List of Persons(List[JSON])
    """

    return person_list


# =========[/vote Endpoints]=========
def get_dict_index(lst: list, key: str, value) -> int:

    for i, DICT in enumerate(lst):
        if DICT[key] == value:
            return i
    return -1


@api.post("/vote")
async def vote_input(request: Request, weight: int = 1):
    """
           Takes String from Input request then checks if Person exists and adds the weights
           number to the number of votes.

           Returns:
                person: Person from Input(JSON)
    """
    person = await request.json()

    if not person in person_list:
        raise HTTPException(status_code=409, detail=f'Candidate doesnt exists')
    person_index = get_dict_index(vote_list, "person", person)
    vote_list[person_index]["Stimmzahl"] += weight
    return person


@api.get("/vote")
async def vote_output():
    """
        Function gives back runtime-storage.

        Returns:
            vote_dict: Dict of Votes(JSON)
    """
    return vote_list