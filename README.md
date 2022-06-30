



<!-- GETTING STARTED  -->
## Getting Started

The CLI tool is capable of tracking dependency versions accross various repositories and additionally can update the dependency version to the required version and create a pull request.  
To get a local copy up and running follow these simple steps.

### Prerequisites

You will need the [Github CLI](https://cli.github.com/). Additionally you should be logged into your github account using the GH CLI.  
* cmd
  ```sh
  gh auth login
  ```
You should also have access to the repositories you are trying to update.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/dyte-submissions/dyte-vit-2022-anayyy.git
   ```
1. Go into the dependencyCheck folder
   ```sh
   cd dyte-vit-2022-anayyy/dependencyCheck
   ```

3. Install node js CLI globally 
   ```sh
   npm install -g
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

You need a csv file that contains a list of repository names and links in the following format.
![image](https://user-images.githubusercontent.com/77318648/171114879-f09e8c5f-f4f8-4438-8187-c926364ab85b.png)
  
You can check for a particular dependency and its version for all the repositories by using the following command.
```sh
depchek <csv_file_path.csv> <dependency@version>
```
This will create a output.csv file like the example below  
![image](https://user-images.githubusercontent.com/77318648/171216497-cb21703d-1215-42dd-9eaa-3f362c51ec30.png)

Additionally you can choose to update repositories with lower versions by including the --update flag. This will generate a pull request with updated versions.
```sh
depchek <csv_file_path.csv> <dependency@version> --update
```
This will generate a output.csv with the following example content  
![image](https://user-images.githubusercontent.com/77318648/171216663-b867500b-6624-48e3-b1f2-f0b6a9ad1f40.png)



<p align="right">(<a href="#top">back to top</a>)</p>



