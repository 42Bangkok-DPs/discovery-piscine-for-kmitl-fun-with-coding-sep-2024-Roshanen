if [ "$#" -eq 0 ]; then
 echo "No arguments supplied"
 exit 1
else
 count=0
 for arg in "$@"; do
  echo -n $arg
  count=$((count+1))
  if [ "$count" -ge 3 ]; then
   break
  else
   echo
  fi
 done
fi