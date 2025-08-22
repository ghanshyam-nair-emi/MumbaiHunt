import kagglehub
import pandas as pd
import numpy as np
import re
import random
import os
import ast

class Kaggle99acres:
    def __init__(self):
        self.dataset_name = "arvanshul/gurgaon-real-estate-99acres-com"
        self.path = kagglehub.dataset_download(self.dataset_name)
        print("Path to dataset files:", self.path)
        print("Files in path:", os.listdir(self.path))
        
    def get_input_data_exported(self):
        path = kagglehub.dataset_download("arvanshul/gurgaon-real-estate-99acres-com")
        print("Path to dataset files:", path)
        print("Path:", path)
        print("Files in path:", os.listdir(path))
        df_mumbai_dataset = pd.read_csv(os.path.join(path, "mumbai.csv"))
        df_mumbai_dataset_narrowed = df_mumbai_dataset[["SPID", "PROP_ID", "PROPERTY_TYPE",'AREA','BEDROOM_NUM','PRICE_PER_UNIT_AREA','PROP_NAME','MIN_PRICE','MAX_PRICE','PRICE','PRICE_SQFT','MAP_DETAILS','location','PROP_HEADING','POSTING_DATE']]
        df_mumbai_dataset_narrowed = df_mumbai_dataset_narrowed.dropna(subset=["BEDROOM_NUM"])

        df_mumbai_dataset_narrowed = df_mumbai_dataset_narrowed[
        ~df_mumbai_dataset_narrowed["PRICE"].str.contains("Cr|L|Price on Request", na=False, case=False)
        ]
        df_new_scheme = pd.DataFrame()
        df_new_scheme["area"] = df_mumbai_dataset_narrowed["location"].apply(self.extract_locality_name)
        df_new_scheme["pricePerSquare"] = df_mumbai_dataset_narrowed["PRICE_PER_UNIT_AREA"]
        df_new_scheme["rooms"] = df_mumbai_dataset_narrowed["BEDROOM_NUM"]
        df_new_scheme["size"] = df_mumbai_dataset_narrowed["AREA"].split(" ")[0].astype(float)
        mask = df_mumbai_dataset_narrowed["PRICE"].str.contains("/Bed|/Bedroom", case=False, na=False)

        extracted_values = df_mumbai_dataset_narrowed["PRICE"].str.extract(r'(\d{1,3}(?:,\d{3})*\.?\d*)\s*/Bed(?:room)?', flags=re.IGNORECASE)[0]

        print("Raw extracted values:", extracted_values[mask])

        extracted_values = extracted_values.str.replace(',', '', regex=False)
        extracted_values = pd.to_numeric(extracted_values, errors='coerce')

        print("Cleaned extracted values:", extracted_values[mask])
        print("BEDROOM_NUM values:", df_mumbai_dataset_narrowed.loc[mask, "BEDROOM_NUM"].values)

        df_mumbai_dataset_narrowed.loc[mask, "PRICE"] = (
            extracted_values[mask] * df_mumbai_dataset_narrowed.loc[mask, "BEDROOM_NUM"]
        ).astype(str)
        df_new_scheme["monthlyFee"] = df_mumbai_dataset_narrowed["PRICE"]
        df_new_scheme["endPrice"] = (
            pd.to_numeric(df_mumbai_dataset_narrowed["PRICE"], errors='coerce') - 
            ((random.randint(1, 10)/100) * pd.to_numeric(df_mumbai_dataset_narrowed["PRICE"], errors='coerce'))
        )
        df_new_scheme["askPrice"] = df_mumbai_dataset_narrowed["PRICE"]
        df_new_scheme["perBedroomval"] = (
            pd.to_numeric(df_mumbai_dataset_narrowed["PRICE"], errors='coerce') / 
            pd.to_numeric(df_mumbai_dataset_narrowed["BEDROOM_NUM"], errors='coerce')
        )
        df_new_scheme["date"] = df_mumbai_dataset_narrowed["POSTING_DATE"]
        df_new_scheme.to_json('output.json', orient='records', indent=2)

    def extract_locality_name(self, x):
        if isinstance(x, dict):
            return x.get("LOCALITY_NAME")
        elif isinstance(x, str):
            try:
                dict_obj = ast.literal_eval(x)
                return dict_obj.get("LOCALITY_NAME") if isinstance(dict_obj, dict) else None
            except:
                return None
        else:
            return None

if __name__ == "__main__":
    processor = Kaggle99acres()
    processor.get_input_data_exported()
    print("Processing completed!")