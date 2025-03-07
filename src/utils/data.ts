export const packagingExecution = {
  "productionItems": [
      {
          "__type": "Pointer",
          "className": "ProductionItem",
          "objectId": "947XiojXTh"
      },
      {
          "__type": "Pointer",
          "className": "ProductionItem",
          "objectId": "PgUUxN5OXj"
      },
      {
          "__type": "Pointer",
          "className": "ProductionItem",
          "objectId": "zeLaBjUGog"
      }
  ],
  "sections": [
      {
          "section": {
              "productionSteps": [
                  {
                      "step": {
                          "__type": "Pointer",
                          "className": "ProductionStep",
                          "objectId": "xqpxCkYPRL"
                      },
                      "reusable": false
                  },
                  {
                      "step": {
                          "__type": "Pointer",
                          "className": "ProductionStep",
                          "objectId": "oDkPnVlc9B"
                      },
                      "reusable": false
                  },
                  {
                      "step": {
                          "__type": "Pointer",
                          "className": "ProductionStep",
                          "objectId": "CBu7G9ZX9u"
                      },
                      "reusable": false
                  },
                  {
                      "step": {
                          "__type": "Pointer",
                          "className": "ReusableProductionStep",
                          "objectId": "AmWQkQWvgX"
                      },
                      "reusable": true,
                      "coeff": 0.1406469760900141,
                      "grossWeight": 0.2705831440008656,
                      "cost": 5.528399870172023,
                      "netWeight": 0.1
                  },
                  {
                      "step": {
                          "__type": "Pointer",
                          "className": "ProductionStep",
                          "objectId": "7WbinexeSf"
                      },
                      "reusable": false
                  }
              ],
              "steps": [
                  {
                      "name": "",
                      "description": "ffff",
                      "ingredients": [
                          {
                              "index": "98266e1e-34c3-4b2c-a40e-0a9639de31e0",
                              "grossWeight": 0.1,
                              "cookingMode": {
                                  "__type": "Pointer",
                                  "className": "CookingMode",
                                  "objectId": "DInHvLSktg"
                              },
                              "supplierItem": {
                                  "__type": "Pointer",
                                  "className": "SupplierItems",
                                  "objectId": "GhBN8voIP8"
                              },
                              "complexity": 3,
                              "transformRate": 100,
                              "netWeight": 0.1
                          }
                      ],
                      "grossWeight": 0
                  }
              ],
              "name": "Poireaux / Tofu",
              "reusable": false,
              "parentId": null,
              "parentPercent": 0,
              "createdAt": "2023-11-29T12:14:45.715Z",
              "updatedAt": "2025-02-11T21:06:11.463Z",
              "grossWeight": 0.7490499936069557,
              "cost": 6.891733203505356,
              "netWeight": 0.23944374120956402,
              "realCost": 6.891733203505356,
              "objectId": "9GUUVtGagC",
              "__type": "Object",
              "className": "Section"
          },
          "sectionName": "Poireaux / Tofu",
          "cost": 11.847999999999999,
          "productionStepExecution": {
              "__type": "Pointer",
              "className": "ProductionStepExecutions",
              "objectId": "qAGWXzaxvj"
          },
          "totalProductionWeight": 184,
          "realWeight": 0.3865546218487395,
          "forecastWaste": 0.004000000000019099,
          "recipeSectionWeight": 0.3911225,
          "proposedWeight": 0.3865546218487395,
          "packagingForecastNumber": null,
          "totalTheoreticalWeight": 2,
          // added manually to the db
          "counterWeighing": {
            "weight": 10,
            "reason": "broken"
          }
      },
      {
          "section": {
              "productionSteps": [
                  {
                      "step": {
                          "__type": "Pointer",
                          "className": "ProductionStep",
                          "objectId": "uBM7KF2Qz2"
                      },
                      "reusable": false
                  },
                  {
                      "step": {
                          "__type": "Pointer",
                          "className": "ProductionStep",
                          "objectId": "FqscRPK1pQ"
                      },
                      "reusable": false
                  }
              ],
              "steps": [
                  {
                      "name": "",
                      "description": "",
                      "ingredients": [
                          {
                              "index": "075f77a0-1790-46a1-bd39-fd4378537ac4",
                              "grossWeight": 0,
                              "complexity": 0
                          }
                      ],
                      "grossWeight": 0
                  }
              ],
              "name": "Boulettes ",
              "reusable": false,
              "parentId": null,
              "parentPercent": 0,
              "createdAt": "2024-01-29T13:47:07.444Z",
              "updatedAt": "2025-02-11T21:06:11.497Z",
              "grossWeight": 0.512,
              "cost": 12.288,
              "netWeight": 0.128,
              "objectId": "E82HNQHRSs",
              "__type": "Object",
              "className": "Section"
          },
          "sectionName": "Boulettes ",
          "recipeSectionWeight": 0.15,
          "cost": 2.5,
          "productionStepExecution": {
              "__type": "Pointer",
              "className": "ProductionStepExecutions",
              "objectId": "Cf8wZa398t"
          },
          "totalProductionWeight": 155,
          "realWeight": 0.155,
          "forecastWaste": 1.670000000000016,
          "proposedWeight": 0.155,
          "packagingForecastNumber": null,
            // added manually to the db
            "counterWeighing": {
                "weight": 20,
                "reason": "other"
            }
      }
  ],
  "packagings": [
      {
          "packaging": {
              "__type": "Pointer",
              "className": "Packaging",
              "objectId": "EVwI4Qk0pG"
          },
          "type": "DISPOSABLE",
          "packagingName": "Barquette Kraft Std",
          "subPackagings": [
              {
                  "subPackaging": {
                      "__type": "Pointer",
                      "className": "Packaging",
                      "objectId": "eFzB4nPpXo"
                  },
                  "subPackagingName": "Couv. Bq Kraft Std",
                  "type": "DISPOSABLE",
                  "brand": "FOODCHERI"
              }
          ],
          "packagingImage": "kfc/uatyrczw5eg2pdvyjaea",
          "instructions": "Spécifique FC",
          "theoreticalNumber": 429,
          "brands": [
              {
                  "brand": "FOODCHERI",
                  "theoreticalNumber": 429
              }
          ],
          "forecastNumber": 0,
          "startTime": 1709635439051,
          "realNumber": 423,
          "endTime": 1709635556788
      },
      {
          "packaging": {
              "__type": "Pointer",
              "className": "Packaging",
              "objectId": "LPC4LDmEhU"
          },
          "type": "REUSABLE",
          "packagingName": "MEPAL350",
          "subPackagings": [
              {
                  "subPackaging": {
                      "__type": "Pointer",
                      "className": "Packaging",
                      "objectId": "poSFwAiN0O"
                  },
                  "subPackagingName": "Couvercle Mepal 350",
                  "type": "REUSABLE",
                  "brand": "FOODCHERI"
              }
          ],
          "packagingImage": "kfc/uatyrczw5eg2pdvyjaea",
          "instructions": "Spécifique FC",
          "theoreticalNumber": 371,
          "brands": [
              {
                  "brand": "FOODCHERI",
                  "theoreticalNumber": 371
              }
          ],
          "forecastNumber": 0,
          "startTime": 1709635556788,
          "realNumber": 367,
          "endTime": 1709635571688
      },
      {
          "packaging": {
              "__type": "Pointer",
              "className": "Packaging",
              "objectId": "626tkiuL7m"
          },
          "type": "CAPPED",
          "packagingName": "Barquette CPET SZ Test",
          "subPackagings": [
              {
                  "subPackaging": {
                      "__type": "Pointer",
                      "className": "Packaging",
                      "objectId": "03KiJCDLVm"
                  },
                  "subPackagingName": "FOURREAU SEAZON",
                  "type": "CAPPED",
                  "brand": "SEAZON"
              }
          ],
          "packagingImage": "kfc/lyiunn3b3vpgr66czkcx",
          "instructions": "Instructions standards",
          "theoreticalNumber": 200,
          "brands": [
              {
                  "brand": "SEAZON",
                  "theoreticalNumber": 200
              }
          ],
          "forecastNumber": 0,
          "startTime": 1709635571688,
          "realNumber": 199,
          "endTime": 1709635584611
      }
  ],
  "recipe": {},
  "recipeName": "Création PSE - Recette A",
  "uniqueCode": "F100",
  "productionDate": 1709683200000,
  "packagingDate": 1709769600000,
  "status": "WEIGHT_TO_VALIDATE",
  "createdAt": "2024-02-21T11:25:17.601Z",
  "updatedAt": "2024-03-05T10:46:24.617Z",
  "expectedPackagingNumber": 1000,
  "startTime": 1709635439050,
  "objectId": "R5ZMNnxUmE",
  "packagingForecastNumber": 0,
  "tempRealNumber": 600,
  "realNumber": 989,
}

export const proposedWeightsBySections = {
  "9GUUVtGagC": 12,
  "E82HNQHRSs": 8,
}