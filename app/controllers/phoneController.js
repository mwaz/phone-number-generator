import Controller from './index';
import store from 'store-js';



export default class PhoneController extends Controller {
    async generateNumbers({body}, res){
        const { NumberToGenerate } = body;
        if(NumberToGenerate > 10000){
            res.status(400).jsend.fail({ message: 'Oops You have exceeded the 10,000  number generation limit'})
        }

        const numberGenerator = () => '0' + Math.floor(Math.random() * 900000000 + 100000000)

        const persistData = (data) => {
            const existingNumbers = store.get('phonenumbers')
            store.set('phonenumbers', JSON.stringify(data))
            const parsedList = JSON.parse(existingNumbers)
            const newList = [...parsedList, ...data ]
            const storedData = store.set('phonenumbers', JSON.stringify(newList))
            return storedData
        }
        
        const generateNumbers = async(NumberToGenerate) => {
            const numberArray = [];
            for (let i = 0; i < NumberToGenerate; i++) {
                const number = numberGenerator();
                numberArray.push(number)
              }
           
              return persistData(numberArray);
        }
        
        const phoneNumbers = await generateNumbers(NumberToGenerate);
        const numberResponse = JSON.parse(phoneNumbers);
        res.status(201).jsend.success({ PhoneNumbers:
        {
            message: `Successfully generated ${NumberToGenerate} numbers`,
            totalNumbersGenerated: numberResponse.length,
            largestGeneratedNumber: `0${Math.max.apply(null, numberResponse)}`,
            smallestGeneratedNumber:`0${Math.min.apply(null, numberResponse)}`,
            generateNumbers: numberResponse,
        }
    })
    }

    async getNumbers(req, res){
        const existingNumbers = store.get('phonenumbers')
        const numberResponse = JSON.parse(existingNumbers);
        res.status(200).jsend.success({ PhoneNumbers:
            {
                numbersGenerated: numberResponse.length,
                largestGeneratedNumber: `0${Math.max.apply(null, numberResponse)}`,
                smallestGeneratedNumber:`0${Math.min.apply(null, numberResponse)}`,
                generateNumbers: numberResponse
            }
        })
    }

    async sortNumbersMax(req, res){
        const existingNumbers = store.get('phonenumbers')
        const numberResponse = JSON.parse(existingNumbers);
        const sorted = numberResponse.sort(function(a, b){return a-b});
        console.log(existingNumbers, 'nmbrs [][][][][[]][][][][][][][][][][][][][][][][][][] your output');
        res.status(200).jsend.success({ PhoneNumbers:
            {
                numbersGenerated: numberResponse.length,
                largestGeneratedNumber: `0${Math.max.apply(null, numberResponse)}`,
                smallestGeneratedNumber:`0${Math.min.apply(null, numberResponse)}`,
                generateNumbers: sorted
            }
        })
    }

    async sortNumbersMin(req, res){
        const existingNumbers = store.get('phonenumbers')
        const numberResponse = JSON.parse(existingNumbers);
        const sorted = numberResponse.sort(function(a, b){return b-a});
        res.status(200).jsend.success({ PhoneNumbers:
            {
                numbersGenerated: numberResponse.length,
                largestGeneratedNumber: `0${Math.max.apply(null, numberResponse)}`,
                smallestGeneratedNumber:`0${Math.min.apply(null, numberResponse)}`,
                generateNumbers: sorted
            }
        })
    }

    async deleteNumbers(req, res){
        store.remove('phonenumbers')
        res.status(200).jsend.success({ message: 'Successfully cleared the phone number storage'
        })
    }
}