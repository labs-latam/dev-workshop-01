pragma solidity >=0.7.0 <0.9.0;

contract StorageSimple {
    uint256 numero;

    function obtenerNumero() public view returns (uint256) {
        return numero;
    }

    function cambiarNumero(uint256 _numero) public {
        numero = _numero;
    }
}
