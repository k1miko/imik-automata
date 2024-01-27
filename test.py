vowels_lower = "aeiou"
vowels_upper = vowels_lower.upper()

consonants_lower = "bcdfghjklmnpqrstvwxyz"
consonants_upper = consonants_lower.upper()

consonants_for_digraph = "n"
consonants_for_digraph_upper = consonants_for_digraph.upper()

second_consonants_for_digraph_lower = "g"
second_consonants_for_digraph_upper = second_consonants_for_digraph_lower.upper()

class LatinToBaybayinConverter:
    def __init__(self):
        self.state = "start"
        self.result = ""
        self.digraph = False

    def process_input(self, input_str):
        for char in input_str:
            stop = False
            stop = self.transition(char)
            if stop == True:
                break
        return self.result

    # Transition
    def transition(self, char):
        # Start State
        if self.state == "start":
            # Input is a vowel
            if char.lower() in vowels_lower or char.upper() in vowels_upper:
                self.state = "vowel"
                self.result = self.result + char
            # Input is a consonant
            elif char.lower() in consonants_lower or char.upper() in consonants_upper:
                # Consonant can form a digraph
                if char.lower() in consonants_for_digraph or char.upper() in consonants_for_digraph_upper:
                    self.digraph = True
                    self.state = "consonant"
                    self.result = self.result + char
                else:
                    self.state = "consonant"
                    self.result = self.result + char
            # Input is a space
            elif char.isspace():
                self.state = "start"
                self.result = self.result + char
            else:
                self.result = "Invalid input"
                return True
        # Consonant State 
        elif self.state == "consonant":
            # Input is a vowel forming a syllable
            if char.lower() in vowels_lower or char.upper() in vowels_upper:
                self.state = "syllable"
                self.result = self.result + char
            # Input is a consonant
            elif char.lower() in consonants_lower or char.upper() in consonants_upper:
                # Consonant for Digraph State
                if char.lower() in second_consonants_for_digraph_lower or char.upper() in second_consonants_for_digraph_upper and self.digraph == True:
                    self.state = "digraph"
                    self.result = self.result + char
                else:
                    self.state = "dead"
                    self.result = "Input not available in Baybayin"
            # Input is a space
            elif char.isspace():
                if len(self.result) > 1:
                    self.state = "space"
                    self.result = self.result[:-1] # Remove last consonant before space
                    self.result = self.result + char # Add space
                else: # A space after the first consonant is invalid
                    self.state = "dead"
                    self.result = "Input not available in Baybayin"
            else:
                self.result = "Invalid input"
                return True
        # Vowel State
        elif self.state == "vowel":
            # Input is a vowel
            if char.lower() in vowels_lower or char.upper() in vowels_upper:
                self.state = "vowel"
                self.result = self.result + char
            # Input is a consonant
            elif char.lower() in consonants_lower or char.upper() in consonants_upper:
                # Consonant can form a digraph
                if char.lower() in consonants_for_digraph or char.upper() in consonants_for_digraph_upper:
                    self.state = "consonant"
                    self.result = self.result + char
                    self.digraph = True
                else:
                    self.state = "consonant"
                    self.result = self.result + char
            # Input is a space
            elif char.isspace():
                self.state = "space"
                self.result = self.result + char
            else:
                self.result = "Invalid input"
        # Syllable State
        elif self.state == "syllable":
            # Input is a vowel
            if char.lower() in vowels_lower or char.upper() in vowels_upper:
                self.state = "vowel"
                self.result = self.result + char
            # Input is a consonant
            elif char.lower() in consonants_lower or char.upper() in consonants_upper:
                # Consonant can form a digraph
                if char.lower() in consonants_for_digraph or char.upper() in consonants_for_digraph_upper:
                    self.state = "consonant"
                    self.result = self.result + char
                    self.digraph = True
                else:
                    self.state = "consonant"
                    self.result = self.result + char
            # Input is a space
            elif char.isspace():
                self.state = "space"
                self.result = self.result + char
            else:
                self.result = "Invalid input"
                return True
        # Digraph State
        elif self.state == "digraph":
            # Input is a vowel
            if char.lower() in vowels_lower or char.upper() in vowels_upper:
                self.state = "syllable"
                self.result = self.result + char
                self.digraph = False
            # Input is a consonant
            elif char.lower() in consonants_lower or char.upper() in consonants_upper:
                self.state = "dead"
                self.result = "Input not available in Baybayin"
            # Input is a space
            elif char.isspace():
                self.state = "dead"
                self.result = "Input not available in Baybayin"
            else:
                self.result = "Invalid input"
                return True
        # Space State
        elif self.state == "space":
            # Input is a vowel
            if char.lower() in vowels_lower or char.upper() in vowels_upper:
                self.state = "vowel"
                self.result = self.result + char
            # Input is a consonant
            elif char.lower() in consonants_lower or char.upper() in consonants_upper:
                # Consonant can form a digraph
                if char.lower() in consonants_for_digraph or char.upper() in consonants_for_digraph_upper:
                    self.state = "consonant"
                    self.result = self.result + char
                    self.digraph = True
                else:
                    self.state = "consonant"
                    self.result = self.result + char
            # Input is a space
            elif char.isspace():
                self.state = "space"
                self.result = self.result + char
            else:
                self.result = "Invalid input"
                return True
        # Dead State
        elif self.state == "dead":
            if char.lower() in vowels_lower or char.upper() in vowels_upper:
                self.state = "dead"
                self.result = "Input not available in Baybayin"
            elif char.lower() in consonants_lower or char.upper() in consonants_upper:
                self.state = "dead"
                self.result = "Input not available in Baybayin"
            # Input is a space
            elif char.isspace():
                self.state = "dead"
                self.result = "Input not available in Baybayin"
            else:
                self.result = "Invalid input"
                return True


if __name__ == "__main__":
    while True:
        converter = LatinToBaybayinConverter()
        input_str = input("Enter a Latin string (type 'exit' to quit): ")

        # Check if the user wants to exit
        if input_str.lower() == "exit":
            break

        converter.process_input(input_str)

        # Checks if final letter is a consonant
        if converter.state == "start":
            converter.result = "Enter a character"
        elif converter.state == "consonant":
            converter.result = converter.result[:-1]  # Exclude the consonant character

        print("Baybayin output:", converter.result)
