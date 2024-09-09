if [ "$#" -eq 0 ]; then
 echo "No arguments supplied"
 exit 1
else
 for arg in "$@"; do
  filename="ex${arg}"
  mkdir $filename
 done
fi