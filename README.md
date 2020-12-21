# Dynamic Json Form builder i18n

Form Schema Example

```json
{
  "type": "object",
  "title": "User Profile",
  "id": "user-profile-form",
  "fieldLanguages": [
    "en",
    "fr"
  ],
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "title": "Name",
      "id": "name"
    },
    "email": {
      "type": "string",
      "title": "Email",
      "id": "email"
    },
    "age": {
      "type": "integer",
      "title": "Age",
      "id": "age"
    },
    "gender": {
      "type": "string",
      "title": "Gender",
      "id": "gender",
      "enum": [
        "Male",
        "Female"
      ]
    },
    "phone": {
      "type": "integer",
      "title": "Phone",
      "id": "phone",
      "style": "phoneNumField"
    },
    "hobby": {
      "type": "string",
      "title": "Hobby",
      "id": "hobby",
      "largeEnum": true,
      "enum": [
        "3D printing",
        "amateur radio",
        "scrapbook",
        "Amateur radio",
        "Acting",
        "Baton twirling",
        "Board games",
        "Book restoration",
        "Cabaret",
        "Calligraphy",
        "Candle making",
        "Computer programming",
        "Coffee roasting",
        "Cooking",
        "Coloring",
        "Cosplaying",
        "Couponing",
        "Creative writing",
        "Crocheting",
        "Cryptography",
        "Dance",
        "Digital arts",
        "Drama",
        "Drawing",
        "Do it yourself",
        "Electronics",
        "Embroidery",
        "Fashion",
        "Flower arranging",
        "Foreign language learning",
        "Gaming",
        "tabletop games",
        "role-playing games",
        "Gambling",
        "Genealogy",
        "Glassblowing",
        "Gunsmithing",
        "Homebrewing",
        "Ice skating",
        "Jewelry making",
        "Jigsaw puzzles",
        "Juggling",
        "Knapping",
        "Knitting",
        "Kabaddi",
        "Knife making",
        "Lacemaking",
        "Lapidary",
        "Leather crafting",
        "Lego building",
        "Lockpicking",
        "Machining",
        "Macrame",
        "Metalworking",
        "Magic",
        "Model building",
        "Listening to music",
        "Origami",
        "Painting",
        "Playing musical instruments",
        "Pet",
        "Poi",
        "Pottery",
        "Puzzles",
        "Quilting",
        "Reading",
        "Scrapbooking",
        "Sculpting",
        "Sewing",
        "Singing",
        "Sketching",
        "Soapmaking",
        "Sports",
        "Stand-up comedy",
        "Sudoku",
        "Table tennis",
        "Taxidermy",
        "Video gaming",
        "Watching movies",
        "Web surfing",
        "Whittling",
        "Wood carving",
        "Woodworking",
        "Worldbuilding",
        "Writing",
        "Yoga",
        "Yo-yoing",
        "Air sports",
        "Archery",
        "Astronomy",
        "Backpacking",
        "BASE jumping",
        "Baseball",
        "Basketball",
        "Beekeeping",
        "Bird watching",
        "Blacksmithing",
        "Board sports",
        "Bodybuilding",
        "Brazilian jiu-jitsu",
        "Community",
        "Cycling",
        "Dowsing",
        "Driving",
        "Fishing",
        "Flag Football",
        "Flying",
        "Flying disc",
        "Foraging",
        "Gardening",
        "Geocaching",
        "Ghost hunting",
        "Graffiti",
        "Handball",
        "Hiking",
        "Hooping",
        "Horseback riding",
        "Hunting",
        "Inline skating",
        "Jogging",
        "Kayaking",
        "Kite flying",
        "Kitesurfing",
        "LARPing",
        "Letterboxing",
        "Metal detecting",
        "Motor sports",
        "Mountain biking",
        "Mountaineering",
        "Mushroom hunting",
        "Mycology",
        "Netball",
        "Nordic skating",
        "Orienteering",
        "Paintball",
        "Parkour",
        "Photography",
        "Polo",
        "Rafting",
        "Rappelling",
        "Rock climbing",
        "Roller skating",
        "Rugby",
        "Running",
        "Sailing",
        "Sand art",
        "Scouting",
        "Scuba diving",
        "Sculling",
        "Rowing",
        "Shooting",
        "Shopping",
        "Skateboarding",
        "Skiing",
        "Skimboarding",
        "Skydiving",
        "Slacklining",
        "Snowboarding",
        "Stone skipping",
        "Surfing",
        "Swimming",
        "Taekwondo",
        "Tai chi",
        "Urban exploration",
        "Vacation",
        "Vehicle restoration",
        "Water sports"
      ]
    },
    "comment": {
      "type": "string",
      "title": "Comment",
      "id": "comment",
      "bilingual": true
    },
    "signature": {
      "type": "string",
      "title": "Signature",
      "id": "signature"
    },
    "education": {
      "type": "array",
      "title": "Education",
      "id": "education",
      "items": {
        "type": "object",
        "id": "education-array-item",
        "properties": {
          "degree": {
            "type": "string",
            "title": "Degree",
            "id": "degree",
            "enum": [
              "Bachelor of Applied Science",
              "Bachelor of Arts",
              "Bachelor of Commerce",
              "Bachelor of Science",
              "Bachelor of Computer Science",
              "Bachelor of Earth Science",
              "Bachelor of Engineering",
              "Bachelor of Veterinary Medicine",
              "Bachelor of Design",
              "Bachelor of Technology",
              "Bachelor of Business",
              "Bachelor of Medical Science",
              "Master of Applied Science",
              "Master of Arts",
              "Master of Commerce",
              "Master of Science",
              "Master of Computer Science",
              "Master of Earth Science",
              "Master of Engineering",
              "Master of Veterinary Medicine",
              "Master of Design",
              "Master of Technology",
              "Master of Business",
              "Master of Medical Science",
              "Doctor of Applied Science",
              "Doctor of Arts",
              "Doctor of Commerce",
              "Doctor of Science",
              "Doctor of Computer Science",
              "Doctor of Earth Science",
              "Doctor of Engineering",
              "Doctor of Veterinary Medicine",
              "Doctor of Design",
              "Doctor of Technology",
              "Doctor of Business",
              "Doctor of Medical Science"
            ]
          },
          "institution": {
            "title": "Institution",
            "id": "institution",
            "multiCol": true,
            "enum": [
              [
                "Carleton University",
                "Ottawa",
                "Ontario",
                "Canada"
              ],
              [
                "University of Ottawa",
                "Ottawa",
                "Ontario",
                "Canada"
              ],
              [
                "McGill University",
                "Montreal",
                "Quebec",
                "Canada"
              ],
              [
                "University of British Columbia",
                "Vancouver",
                "British Columbia",
                "Canada"
              ],
              [
                "University Toronto",
                "Toronto",
                "Ontario",
                "Canada"
              ],
              [
                "McMaster University",
                "Hamilton",
                "Ontario",
                "Canada"
              ]
            ]
          }
        }
      }
    },
    "resume": {
      "type": "string",
      "style": "file",
      "title": "Resume",
      "id": "resume",
      "accepts": [
        ".pdf",
        ".docx",
        ".xlsx",
        ".jpeg",
        ".png",
        ".jpg"
      ]
    },
    "work-experience": {
      "type": "string",
      "title": "Work Experience",
      "id": "work-experience",
      "bilingual": true,
      "textarea": true
    },
    "bundle-field": {
      "type": "object",
      "title": "Bundle Field",
      "id": "bundle-field",
      "style": "regularBundleField",
      "properties": {
        "BDL-field1": {
          "type": "integer",
          "title": "BDL-field1",
          "id": "BDL-field1"
        },
        "BDL-field2": {
          "type": "string",
          "title": "BDL-field1",
          "id": "BDL-field2",
          "enum": [
            "value1",
            "value2",
            "value3",
            "value4"
          ]
        },
        "BDL-field3": {
          "type": "string",
          "title": "BDL-field3",
          "id": "BDL-field3"
        }
      }
    },
    "funding-bundle": {
      "type": "object",
      "title": "Funding Record",
      "id": "funding-bundle",
      "style": "fundingBundleField",
      "properties": {
        "funding": {
          "type": "string",
          "title": "Funding",
          "id": "funding",
          "style": "fundingBundleFunding"
        },
        "currency": {
          "title": "Currency",
          "id": "currency",
          "style": "fundingBundleCurrency",
          "multiCol": true,
          "enum": [
            [
              "CAD",
              "Canadian Dollar"
            ],
            [
              "USD",
              "US Dollar"
            ],
            [
              "ARS",
              "Argentine Peso"
            ],
            [
              "CNY",
              "Yuan Renminbi"
            ],
            [
              "EUR",
              "Euro"
            ],
            [
              "JPY",
              "Yen"
            ],
            [
              "INR",
              "Indian Rupee"
            ],
            [
              "TRY",
              "Turkish Lira"
            ]
          ]
        },
        "converted-funding": {
          "type": "integer",
          "title": "Converted Funding",
          "id": "converted-funding",
          "style": "fundingBundleConvertedFunding"
        }
      }
    }
  }
}
```



> ###### Line 2-4:
>
> Define the form, the form is basically `object`, each field in the form is the properties. But we can also define object inside the form.
>
> * `Id` is a mandatory attribute for form definition and everything inside it. (Single field, array field and object field and the nested field within array and object field)
>
> ###### Line 5-8:
>
> Define how many languages is available for multiLang field.
>
> * It is an array of string, accept maximum 2 value
>
> ###### Line 9-11:
>
> Define the required fields for the Form
>
> *  It is an array of the field name.
>
> > ###### Line 12-436
> >
> > Properties of the Form define the fields 
> >
> > > ###### Line 13-17 & Line 18-22 & Line 224-228
> > >
> > > Single String field
> > >
> > > * `type: "string"` indicates that the value of the field is a string, it also associated with the basic validation.
> > >
> > > ###### Line 23-27
> > >
> > > Single Integer Field
> > >
> > > * `type:"integer` indicates that the value of the field is an integer, it also associated with the basic validation.
> > >
> > > ###### Line 28-36 & Line 237-279
> > >
> > > Single Selection Field
> > >
> > > * `type: "string"` indicates that the value of the field is a string. `Enum` defines it is a selection field and the options.
> > >
> > > ###### Line 37-42
> > >
> > > Single integer field with phone number format
> > >
> > > * `type:"integer` indicates that the value of the field is an integer. `Value: "phoneNumField"` defines the view is formatted.
> > >
> > > ###### Line 43-217
> > >
> > > Single Windowed Selection Field
> > >
> > > * `type: "string"` indicates that the value of the field is a string. `Enum` defines it is a selection field and the options. `LargeEnum: true` defines this selection field has a large set of options. 
> > >
> > > ###### Line 218-223
> > >
> > > Single Bilingual String Field
> > >
> > > * `type: "string"` indicates that the value of the field is a string. `bilingual:true` defines this field is bilingual which accept multiple inputs
> > >
> > > ###### Line 229-325
> > >
> > > Array Field
> > >
> > > * `type: "array"` indicates that this is an array field. Array Field is an array that each element is a copy of all the fields defined inside `items`, each copy can have a distinct value.
> > > * Array Field now displayed as Modal
> > >
> > > > ###### Line 233-324
> > > >
> > > > Object Field
> > > >
> > > > * `type: "object"` indicates that this is an object field. Object field can has its own properties, while each property is a field nested inside the object. The fields are defined inside `properties` property.
> > > >
> > > > > ###### Line 280-322
> > > > >
> > > > > Single Multi-Column Selection Field
> > > > >
> > > > > * `enum` and `multiCol: true` indicates that this is a single selection field, but each option has multiple columns like a table.
> > >
> > > ###### Line 326-339
> > >
> > > File Field
> > >
> > > * File field can handle file submission and preview.
