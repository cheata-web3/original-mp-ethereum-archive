import json,urllib.request,hashlib
import os
RPC=os.environ.get("RPC_URL","https://eth.drpc.org")
A="0x5C5CEa5F9466D8fd9B8D9b3Bd0F4705fc4A7ae74"; TX="0x6ffb1d00e827ae77b1e1940ac52d0abb3acbc6445ae19c6e981ac1a4aebedfeb"
def rpc(m,p):
    r=urllib.request.Request(RPC,json.dumps({"jsonrpc":"2.0","id":1,"method":m,"params":p}).encode(),{"content-type":"application/json","user-agent":"curl/8"})
    j=json.load(urllib.request.urlopen(r,timeout=30)); 
    if "error" in j: raise Exception(m+str(j))
    return j["result"]
tx=rpc("eth_getTransactionByHash",[TX]); rc=rpc("eth_getTransactionReceipt",[TX])
blk=rpc("eth_getBlockByNumber",[tx["blockNumber"],False])
code=rpc("eth_getCode",[A,"latest"])
head=rpc("eth_blockNumber",[])
def call(sel): return rpc("eth_call",[{"to":A,"data":sel},head])
def dstr(h):
    b=bytes.fromhex(h[2:])
    if len(b)>=64 and int.from_bytes(b[:32],'big')==32:
        n=int.from_bytes(b[32:64],'big'); return b[64:64+n].decode()
    return b.rstrip(b'\0').decode()
raw={k:call(s) for k,s in {"name":"0x06fdde03","symbol":"0x95d89b41","decimals":"0x313ce567","totalSupply":"0x18160ddd","version":"0x54fd4d50"}.items()}
dec=int(raw["decimals"],16); ts=int(raw["totalSupply"],16)
reads={"network":"Ethereum Mainnet","chainId":int(rpc("eth_chainId",[]),16),"contract":A,"blockTag":int(head,16),
 "name":dstr(raw["name"]),"symbol":dstr(raw["symbol"]),"decimals":dec,"totalSupplyRaw":str(ts),
 "totalSupply":f"{ts/10**dec:,.0f}","version":dstr(raw["version"]),"raw":raw}
print(json.dumps(reads,indent=2))
json.dump(tx,open("archive/creation-transaction.json","w"),indent=2)
json.dump(rc,open("archive/creation-receipt.json","w"),indent=2)
open("archive/creation-input.hex","w").write(tx["input"]+"\n")
open("archive/runtime-bytecode.hex","w").write(code+"\n")
json.dump(reads,open("archive/rpc-reads.json","w"),indent=2)
json.dump({"network":"Ethereum Mainnet","chainId":1,"rpcEndpoint":RPC,"contract":A,"creationTransaction":TX,
 "creationBlock":int(tx["blockNumber"],16),"creationBlockHash":tx["blockHash"],"creationTimestamp":int(blk["timestamp"],16),
 "creator":tx["from"],"receiptContractAddress":rc["contractAddress"],"readsAtBlock":int(head,16),
 "runtimeBytecodeKeccakNote":"see hashes.txt for SHA-256","files":["creation-transaction.json","creation-receipt.json","creation-input.hex","runtime-bytecode.hex","rpc-reads.json"]},open("archive/ethereum-mainnet.json","w"),indent=2)
import subprocess
files=["creation-transaction.json","creation-receipt.json","creation-input.hex","runtime-bytecode.hex","rpc-reads.json","ethereum-mainnet.json"]
open("archive/hashes.txt","w").write(subprocess.check_output(["sha256sum",*files],cwd="archive").decode())
