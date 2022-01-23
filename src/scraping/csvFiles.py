import pandas
 
DATA_FILE = '../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/08-30-2021.csv'
 
def main():
  df = pandas.read_csv(DATA_FILE)
  print(df)
 
if __name__ == "__main__":
    main()